/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @flow strict-local
 * @format
 */

import NativeEventEmitter from '../NativeEventEmitter';
import Platform from '../../../exports/Platform';
import type {
  EventMapping,
  AnimatedNodeConfig,
  AnimatingNodeConfig,
} from './NativeAnimatedModule';
import type { EndCallback} from './animations/Animation';
import type {InterpolationConfigType} from './nodes/AnimatedInterpolation';

const MAX_SAFE_INTEGER = 9007199254740991
const MAX_ARRAY_LENGTH = 4294967295

// TODO T69437152 @petetheheat - Delete this fork when Fabric ships to 100%.
/* const NativeAnimatedModule =
  Platform.OS === 'ios' && global.RN$Bridgeless
    ? NativeAnimatedTurboModule
    : NativeAnimatedNonTurboModule;*/

type Config = {
  type: 'transform',
  transforms: Object[]
} | {
  type: 'value',
  value: number
} | {
  type: 'addition',
  input: [number, number]
} | {
  type: 'multiplication',
  input: [number, number]
} | {
  type: 'subtraction',
  input: [number, number]
}

type AnimatedNode = {
  tag: number,
  parents: number[],
  children: number[],
  animationId?: string, // if driven
  config: Config | {
    type: 'props',
    props: {
      style: number
    }
  } | {
    type: 'style',
    props: {
      [string]: number
    }
  },
  viewTag?: HTMLElement
}

const animatedNodes: { [number]: AnimatedNode } = {

}

type AnimationTracker = {
  nodeTag: number,
  config: Object,
  webAnimations: Animation[],
  orderedFrames: number[],
  duration: number
}

const animations: { [string]: AnimationTracker } = {

}

const KEYFRAME_TO_MS_FACTOR = 1000 / 60

const traverseValueNode = (node: AnimatedNode, drivingNodes: { [number]: number }): number => {
  if(!node){
    return 0;
  }
  if(drivingNodes[node.tag] !== undefined){ // this is a driven value
    return drivingNodes[node.tag];
  }
  if(node.animationId && animations[node.animationId]){ // if there is already an animation let's use it
    
    const animation = animations[node.animationId];
    
    if(animation.webAnimations[0].currentTime >= animation.duration){
      return animation.orderedFrames[animation.orderedFrames.length - 1]
    }
    if(animation.webAnimations[0].currentTime === 0){
      return animation.orderedFrames[0]
    }
    const frameToGet = Math.round(animation.webAnimations[0].currentTime /  KEYFRAME_TO_MS_FACTOR);
    const value = animation.orderedFrames[frameToGet];
    return value;
  }
  if(node.config.type === 'transform'){
    const transform = node.config.transforms.reduce((prev: string[], cur) => {
      const { property, nodeTag } = cur;
      const animatedNode = animatedNodes[nodeTag];
      const value = traverseValueNode(animatedNode, drivingNodes);
      const suffix = property.includes('translate') ? 'px' : property.includes('rotate') || property.includes('skew') ? 'deg' : '';

      return [...prev, property + '(' + value + suffix + ')'];
    }, []).join(' ')

    return transform;
  }
  if(node.config.type === 'value'){
    return node.config.value;
  }
  if(node.config.type === 'addition'){
    return node.config.input.reduce((val, inputKey) => {
      const animatedNode = animatedNodes[inputKey];
      return val + traverseValueNode(animatedNode, drivingNodes);
    }, 0);
  }
  if(node.config.type === "multiplication"){
    return node.config.input.reduce((val, inputKey) => {
      const animatedNode = animatedNodes[inputKey];
      return val * traverseValueNode(animatedNode, drivingNodes);
    }, 1);
  }
  if(node.config.type === "subtraction"){
    return node.config.input.reduce((val, inputKey) => {
      const animatedNode = animatedNodes[inputKey];
      return val - traverseValueNode(animatedNode, drivingNodes);
    }, 0);
  }
  if (node.config.type === "interpolation") {
    const {
      inputRange, outputRange, extrapolateLeft, extrapolateRight
    } = node.config;

    //todo: allow multiple drivers ????

    const animatedNodeValue = traverseValueNode(animatedNodes[node.parents[0]], drivingNodes);

    //todo: allow extrapolation

    if(/*!extrapolateLeft &&*/ animatedNodeValue <= inputRange[0]){
      return outputRange[0]
    }
    if(/*!extrapolateRight &&*/ animatedNodeValue >= inputRange[inputRange.length - 1]){
      return outputRange[outputRange.length - 1]
    }
    const lastIndex = inputRange.findIndex(value => animatedNodeValue < value);
    const firstIndex = lastIndex - 1;
    const firstValue = inputRange[firstIndex];
    const lastValue = inputRange[lastIndex];

    const progress = (animatedNodeValue - firstValue) / (lastValue - firstValue);
    
    const outputValue = outputRange[firstIndex] + progress * (outputRange[lastIndex] - outputRange[firstIndex]);

    return outputValue
  }


  console.log('Missing logic for animation action "' + node.config.type + '"', node.config)
  throw new Error('Missing logic for animation action "' + node.config.type + '"')
}

const setAnimatedNodeValue = (nodeTag: number, animatedValue: number) => {
  const animatedNode = animatedNodes[nodeTag];

  const viewReducer = (found, childTag) => {
    const child = animatedNodes[childTag];
    if(child.viewTag){
      const styleParent = animatedNodes[child.parents[0]];

      const keysToAnimate = Object.keys(styleParent.config.style)
      
      const style = keysToAnimate.reduce((prev, key) => {
        const animatedNodeKey = styleParent.config.style[key];
        const animatedNode = animatedNodes[animatedNodeKey]
        const value = traverseValueNode(animatedNode, { [nodeTag]: animatedValue})
        return { ...prev, [key]: '"' + value + '"' }
      }, {})
      
      return [{ viewTag: child.viewTag, style }, ...found]
    }
    else if(child.children && child.children.length > 0) {
      return child.children.reduce(viewReducer, found)
    }
    return found;
  };

  const viewTags = animatedNode.children.reduce(viewReducer, [])

  viewTags.forEach(({viewTag, style })=>{
    Object.keys(styleProp => {
      viewTag.style[styleProp] = style[styleProp]
    })
  });
}

function times(n, iteratee) {
  if (n < 1 || n > MAX_SAFE_INTEGER) {
    return []
  }
  let index = -1
  const length = Math.min(n, MAX_ARRAY_LENGTH)
  const result = new Array(length)
  while (++index < length) {
    result[index] = iteratee(index)
  }
  index = MAX_ARRAY_LENGTH
  n -= MAX_ARRAY_LENGTH
  while (++index < n) {
    iteratee(index)
  }
  return result
}

const NativeAnimatedModule = {
  startOperationBatch: () => {
    console.warn('startOperationBatch not implemented on web')
  },
  finishOperationBatch: () => {
    console.warn('finishOperationBatch not implemented on web')
  },
  createAnimatedNode: (tag: number, config: AnimatedNodeConfig) => {
    animatedNodes[tag] = { config, children: [], parents: [], tag };
  },
  getValue: (tag: number, saveValueCallback: SaveValueCallback) => {
    const node = animatedNodes[tag];
    const value = traverseValueNode(node, {})
    saveValueCallback(value);
    return value;
  },
  startListeningToAnimatedNodeValue: (tag: number) => {
    console.warn('startListeningToAnimatedNodeValue not implemented on web', {tag})
  },
  stopListeningToAnimatedNodeValue: (tag: number) => {
    console.warn('stopListeningToAnimatedNodeValue not implemented on web', {tag})
  },
  connectAnimatedNodes: (parentTag: number, childTag: number) => {
    if(animatedNodes[parentTag]?.children){
      animatedNodes[parentTag].children.push(childTag)
    }
    if(animatedNodes[childTag]?.parents){
      animatedNodes[childTag].parents.push(parentTag)
    }
  },
  disconnectAnimatedNodes: (parentTag: number, childTag: number) => {
    if(animatedNodes[parentTag]?.children){       
      animatedNodes[parentTag].children = animatedNodes[parentTag].children.filter(c => c !== childTag)
    }
    if(animatedNodes[childTag]?.parents){
      animatedNodes[childTag].parents = animatedNodes[childTag].parents.filter(c => c != parentTag)
    }
  },
  startAnimatingNode: (
    animationId: string,
    nodeTag: number,
    config: AnimatingNodeConfig,
    endCallback: EndCallback,
  ) => {
    //console.log('startAnimatingNode', { nodeTag, config, animatedNodes })

    const animatedNode = animatedNodes[nodeTag];

    const currentValue = traverseValueNode(animatedNode, {});

    // console.log('currentValue', currentValue);
    // console.log('animatedNode', animatedNode);

    let toValue = config.toValue;
    let frames = config.frames;

    if(config.type !== 'frames'){
      console.warn('"' + config.type + '" not yet implemented for web, falling back to linear timing')
      const keyframeCount = Math.round(300 / KEYFRAME_TO_MS_FACTOR);
      const maxValue = Math.max(config.toValue || 0, currentValue);
      if(config.type === 'decay'){
        toValue = 0;
      }
      
      const newFrames = [0, ...times(keyframeCount, (index) => {
        // console.log('index', index);
        return maxValue * (index + 1) / keyframeCount
      })];
      // console.log('newFrames', newFrames);
      frames = newFrames
    }

    // console.log('frames', frames);

    const isDescending = toValue === frames[0];

    const filteredFrames = isDescending ? frames.filter(f => f <= currentValue) :  frames.filter(f => f >= currentValue);

    let orderedFrames = isDescending ? filteredFrames.reverse() : filteredFrames;
    

    const viewReducer = (found, childTag) => {
      const child = animatedNodes[childTag];
      if(child.viewTag && !found.find(f => f.viewTag === child.viewTag)){
        const styleParent = animatedNodes[child.parents[0]];

        const keysToAnimate = Object.keys(styleParent.config.style)        
        const keyframes = orderedFrames.map(animatedNodeValue => {
          return keysToAnimate.reduce((prev, key) => {
            const animatedNodeKey = styleParent.config.style[key];
            const animatedNode = animatedNodes[animatedNodeKey]
            const value = traverseValueNode(animatedNode, { [nodeTag]: animatedNodeValue })
            return { ...prev, [key]: value }
          }, {})
        });
        
        return [{ viewTag: child.viewTag, keyframes }, ...found]
      }
      else if(child.children && child.children.length > 0) {
        return child.children.reduce(viewReducer, found)
      }
      return found;
    };

    const viewTags = animatedNode.children.reduce(viewReducer, [])

    if(!viewTags || viewTags.length === 0){
      console.warn('Seems like there is an Animated.Value being animated without view to apply it to?')
      return;
    }

    const duration = Math.round(KEYFRAME_TO_MS_FACTOR * orderedFrames.length);

    const webAnimations = viewTags.map(({ viewTag, keyframes }: { viewTag: HTMLElement, keyframes: Keyframe[] }) => {
      const animation = viewTag.animate(
        keyframes, {
          duration,
          iterations: config.iterations,
          // easing: 'ease-in-out',ƒ
          fill: 'both',
          // easing: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
        }
      )
      animation.onfinish = () => {
        endCallback({finished: true});
      }

      animation.onremove = () => {
        delete animations[animationId]
      }

      animation.oncancel = () => {
        endCallback({finished: false});
      }
      
      return animation;
    });

    animatedNode.animationId = animationId;
    animatedNode.config.value = toValue;
    animations[animationId] = {
      nodeTag,
      config,
      webAnimations,
      orderedFrames,
      duration
    }
  },
  stopAnimation: (animationId: string) => {
    if(animations[animationId]?.webAnimations){
      animations[animationId].webAnimations.forEach((animation: Animation)=>{
        animation.pause();
      });
    }
  },
  setAnimatedNodeValue,
  setAnimatedNodeOffset: (nodeTag: number, offset: number) => {
    console.warn('setAnimatedNodeOffset not implemented on web')
  },
  flattenAnimatedNodeOffset: (nodeTag: number) => {
    console.warn('flattenAnimatedNodeOffset not implemented on web')
  },
  extractAnimatedNodeOffset: (nodeTag: number) => {
    console.warn('extractAnimatedNodeOffset not implemented on web')
  },
  connectAnimatedNodeToView: (nodeTag: number, viewTag: number) => {
    if(animatedNodes[nodeTag]){
      animatedNodes[nodeTag].viewTag = viewTag
    }
  },
  disconnectAnimatedNodeFromView: (nodeTag: number, viewTag: number) => {
    if(animatedNodes[nodeTag] && animatedNodes[nodeTag].viewTag){
      delete animatedNodes[nodeTag].viewTag;
    }
  },
  restoreDefaultValues: (nodeTag: number) => {
    if(animatedNodes[nodeTag]?.config){
      if(animatedNodes[nodeTag].config.value !== undefined){
        setAnimatedNodeValue(nodeTag, animatedNodes[nodeTag].config.value)
      }
    }
  },
  dropAnimatedNode: (tag: number) => {
    delete animatedNodes[tag];
  },
  addAnimatedEventToView: (
    viewTag: number,
    eventName: string,
    eventMapping: EventMapping,
  ) => {
    console.warn('addAnimatedEventToView not implemented on web',{ 
      viewTag,
      eventName,
      eventMapping
    })
  },
  removeAnimatedEventFromView: (
    viewTag: number,
    eventName: string,
    animatedNodeTag: number,
  ) => {
    console.warn('removeAnimatedEventFromView not implemented on web', { 
      viewTag,
      eventName,
      animatedNodeTag
    })
  },

  // Events
  addListener: (eventName: string) => {
    console.warn('addListener not implemented on web', { eventName })
  },
  removeListeners: (count: number) => {
    console.warn('removeListeners not implemented on web', { count })
  },
}

let __nativeAnimatedNodeTagCount = 1; /* used for animated nodes */
let __nativeAnimationIdCount = 1; /* used for started animations */

let nativeEventEmitter;

let waitingForQueuedOperations = new Set();
let queueOperations = false;
let queue: Array<() => void> = [];

/**
 * Simple wrappers around NativeAnimatedModule to provide flow and autocomplete support for
 * the native module methods
 */
const API = {
  getValue: function(
    tag: number,
    saveValueCallback: (value: number) => void,
  ): void {
    if (NativeAnimatedModule.getValue) {
      NativeAnimatedModule.getValue(tag, saveValueCallback);
    }
  },
  setWaitingForIdentifier: function(id: string): void {
    waitingForQueuedOperations.add(id);
    queueOperations = true;
  },
  unsetWaitingForIdentifier: function(id: string): void {
    waitingForQueuedOperations.delete(id);

    if (waitingForQueuedOperations.size === 0) {
      queueOperations = false;
      API.disableQueue();
    }
  },
  disableQueue: function(): void {
    if (Platform.OS === 'android') {
      NativeAnimatedModule.startOperationBatch();
    }
    for (let q = 0, l = queue.length; q < l; q++) {
      queue[q]();
    }
    queue.length = 0;
    if (Platform.OS === 'android') {
      NativeAnimatedModule.finishOperationBatch();
    }
  },
  queueOperation: (fn: () => void): void => {
    if (queueOperations) {
      queue.push(fn);
    } else {
      fn();
    }
  },
  createAnimatedNode: function(tag: number, config: AnimatedNodeConfig): void {
    API.queueOperation(() =>
      NativeAnimatedModule.createAnimatedNode(tag, config),
    );
  },
  startListeningToAnimatedNodeValue: function(tag: number) {
    API.queueOperation(() =>
      NativeAnimatedModule.startListeningToAnimatedNodeValue(tag),
    );
  },
  stopListeningToAnimatedNodeValue: function(tag: number) {
    API.queueOperation(() =>
      NativeAnimatedModule.stopListeningToAnimatedNodeValue(tag),
    );
  },
  connectAnimatedNodes: function(parentTag: number, childTag: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.connectAnimatedNodes(parentTag, childTag),
    );
  },
  disconnectAnimatedNodes: function(parentTag: number, childTag: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.disconnectAnimatedNodes(parentTag, childTag),
    );
  },
  startAnimatingNode: function(
    animationId: string,
    nodeTag: number,
    config: AnimatingNodeConfig,
    endCallback: EndCallback,
  ): void {
    API.queueOperation(() =>
      NativeAnimatedModule.startAnimatingNode(
        animationId,
        nodeTag,
        config,
        endCallback,
      ),
    );
  },
  stopAnimation: function(animationId: string) {
    API.queueOperation(() => NativeAnimatedModule.stopAnimation(animationId));
  },
  setAnimatedNodeValue: function(nodeTag: number, value: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.setAnimatedNodeValue(nodeTag, value),
    );
  },
  setAnimatedNodeOffset: function(nodeTag: number, offset: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.setAnimatedNodeOffset(nodeTag, offset),
    );
  },
  flattenAnimatedNodeOffset: function(nodeTag: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.flattenAnimatedNodeOffset(nodeTag),
    );
  },
  extractAnimatedNodeOffset: function(nodeTag: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.extractAnimatedNodeOffset(nodeTag),
    );
  },
  connectAnimatedNodeToView: function(nodeTag: number, viewTag: number): void {
    API.queueOperation(() =>
      NativeAnimatedModule.connectAnimatedNodeToView(nodeTag, viewTag),
    );
  },
  disconnectAnimatedNodeFromView: function(
    nodeTag: number,
    viewTag: number,
  ): void {
    API.queueOperation(() =>
      NativeAnimatedModule.disconnectAnimatedNodeFromView(nodeTag, viewTag),
    );
  },
  restoreDefaultValues: function(nodeTag: number): void {
    if (NativeAnimatedModule.restoreDefaultValues != null) {
      API.queueOperation(() =>
        NativeAnimatedModule.restoreDefaultValues(nodeTag),
      );
    }
  },
  dropAnimatedNode: function(tag: number): void {
    API.queueOperation(() => NativeAnimatedModule.dropAnimatedNode(tag));
  },
  addAnimatedEventToView: function(
    viewTag: number,
    eventName: string,
    eventMapping: EventMapping,
  ) {
    API.queueOperation(() =>
      NativeAnimatedModule.addAnimatedEventToView(
        viewTag,
        eventName,
        eventMapping,
      ),
    );
  },
  removeAnimatedEventFromView(
    viewTag: number,
    eventName: string,
    animatedNodeTag: number,
  ) {
    API.queueOperation(() =>
      NativeAnimatedModule.removeAnimatedEventFromView(
        viewTag,
        eventName,
        animatedNodeTag,
      ),
    );
  },
};

/**
 * Styles allowed by the native animated implementation.
 *
 * In general native animated implementation should support any numeric property that doesn't need
 * to be updated through the shadow view hierarchy (all non-layout properties).
 */
const SUPPORTED_STYLES = {
  opacity: true,
  transform: true,
  borderRadius: true,
  borderBottomEndRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,
  borderBottomStartRadius: true,
  borderTopEndRadius: true,
  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderTopStartRadius: true,
  elevation: true,
  zIndex: true,
  /* ios styles */
  shadowOpacity: true,
  shadowRadius: true,
  /* legacy android transform properties */
  scaleX: true,
  scaleY: true,
  translateX: true,
  translateY: true,
};

const SUPPORTED_TRANSFORMS = {
  translateX: true,
  translateY: true,
  scale: true,
  scaleX: true,
  scaleY: true,
  rotate: true,
  rotateX: true,
  rotateY: true,
  rotateZ: true,
  perspective: true,
};

const SUPPORTED_INTERPOLATION_PARAMS = {
  inputRange: true,
  outputRange: true,
  extrapolate: true,
  extrapolateRight: true,
  extrapolateLeft: true,
};

function addWhitelistedStyleProp(prop: string): void {
  console.log('addWhitelistedStyleProp', {prop})
  SUPPORTED_STYLES[prop] = true;
}

function addWhitelistedTransformProp(prop: string): void {
  console.log('addWhitelistedTransformProp', {prop})
  SUPPORTED_TRANSFORMS[prop] = true;
}

function addWhitelistedInterpolationParam(param: string): void {
  SUPPORTED_INTERPOLATION_PARAMS[param] = true;
}

function validateTransform(
  configs: Array<
    | {
        type: 'animated',
        property: string,
        nodeTag: ?number,
        ...
      }
    | {
        type: 'static',
        property: string,
        value: number | string,
        ...
      },
  >,
): void {
  console.log('validateTransform', {configs})
  configs.forEach(config => {
    if (!SUPPORTED_TRANSFORMS.hasOwnProperty(config.property)) {
      throw new Error(
        `Property '${config.property}' is not supported by native animated module`,
      );
    }
  });
}

function validateStyles(styles: {[key: string]: ?number, ...}): void {
  console.log('validateStyles', {styles})
  for (const key in styles) {
    if (!SUPPORTED_STYLES.hasOwnProperty(key)) {
      throw new Error(
        `Style property '${key}' is not supported by native animated module`,
      );
    }
  }
}

function validateInterpolation(config: InterpolationConfigType): void {
  console.log('validateInterpolation', {config})
  for (const key in config) {
    if (!SUPPORTED_INTERPOLATION_PARAMS.hasOwnProperty(key)) {
      throw new Error(
        `Interpolation property '${key}' is not supported by native animated module`,
      );
    }
  }
}

function generateNewNodeTag(): number {
  console.log('generateNewNodeTag')
  return __nativeAnimatedNodeTagCount++;
}

export function generateNewAnimationId(): number {
  console.log('generateNewAnimationId')
  return __nativeAnimationIdCount++;
}

function assertNativeAnimatedModule(): void {
  // invariant(NativeAnimatedModule, 'Native animated module is not available');
}

let _warnedMissingNativeAnimated = false;

export function shouldUseNativeDriver(
  config: {...AnimationConfig, ...} | EventConfig,
): boolean {
  if (config.useNativeDriver == null) {
    console.warn(
      'Animated: `useNativeDriver` was not specified. This is a required ' +
        'option and must be explicitly set to `true` or `false`',
    );
  }

  if(config.useNativeDriver){
    return true;
  }

  if (config.useNativeDriver === true && !NativeAnimatedModule) {
    if (!_warnedMissingNativeAnimated) {
      console.warn(
        'Animated: `useNativeDriver` is not supported because the native ' +
          'animated module is missing. Falling back to JS-based animation. To ' +
          'resolve this, add `RCTAnimation` module to this app, or remove ' +
          '`useNativeDriver`. ' +
          'Make sure to run `pod install` first. Read more about autolinking: https://github.com/react-native-community/cli/blob/master/docs/autolinking.md',
      );
      _warnedMissingNativeAnimated = true;
    }
    return false;
  }

  return config.useNativeDriver || false;
}

function transformDataType(value: number | string): number | string {
  // Change the string type to number type so we can reuse the same logic in
  // iOS and Android platform
  if (typeof value !== 'string') {
    return value;
  }
  if (/deg$/.test(value)) {
    const degrees = parseFloat(value) || 0;
    const radians = (degrees * Math.PI) / 180.0;
    return radians;
  } else {
    return value;
  }
}

export default {
  API,
  addWhitelistedStyleProp,
  addWhitelistedTransformProp,
  addWhitelistedInterpolationParam,
  validateStyles,
  validateTransform,
  validateInterpolation,
  generateNewNodeTag,
  generateNewAnimationId,
  assertNativeAnimatedModule,
  shouldUseNativeDriver,
  transformDataType,
  // $FlowExpectedError - unsafe getter lint suppresion
  get nativeEventEmitter(): NativeEventEmitter {
    if (!nativeEventEmitter) {
      nativeEventEmitter = new NativeEventEmitter(NativeAnimatedModule);
    }
    return nativeEventEmitter;
  },
};
