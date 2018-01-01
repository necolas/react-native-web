/* eslint-env jasmine, jest */

import processColor from '..';

describe('apis/StyleSheet/processColor', () => {
  describe('predefined color names', () => {
    it('should not convert "red"', () => {
      const color = processColor('red');
      expect(color).toEqual('red');
    });

    it('should not convert "white"', () => {
      const color = processColor('white');
      expect(color).toEqual('white');
    });

    it('should not convert "black"', () => {
      const color = processColor('black');
      expect(color).toEqual('black');
    });

    it('should not convert "currentcolor"', () => {
      const color = processColor('currentcolor');
      expect(color).toEqual('currentcolor');
    });

    it('should not convert "inherit"', () => {
      const color = processColor('inherit');
      expect(color).toEqual('inherit');
    });

    it('should not convert "transparent"', () => {
      const color = processColor('transparent');
      expect(color).toEqual('transparent');
    });
  });

  describe('RGB strings', () => {
    it('should not convert "rgb(x,y,z)"', () => {
      const color = processColor('rgb(10,20,30)');
      expect(color).toEqual('rgb(10,20,30)');
    });
  });

  describe('RGBA strings', () => {
    it('should not convert "rgba(x,y,z,a)"', () => {
      const color = processColor('rgba(10,20,30,0.4)');
      expect(color).toEqual('rgba(10,20,30,0.4)');
    });
  });

  describe('HSL strings', () => {
    it('should not convert "hsl(x,y%,z%)"', () => {
      const color = processColor('hsl(318,69%,55%)');
      expect(color).toEqual('hsl(318,69%,55%)');
    });
  });

  describe('HSLA strings', () => {
    it('should not convert "hsla(x,y%,z%,a)"', () => {
      const color = processColor('hsla(318,69%,55%,0.25)');
      expect(color).toEqual('hsla(318,69%,55%,0.25)');
    });
  });

  describe('hex strings', () => {
    it('should convert "#rrggbb"', () => {
      const color = processColor('#1e83c9');
      expect(color).toEqual('rgba(30,131,201,1)');
    });

    it('should convert "#rgba"', () => {
      const color = processColor('#123A');
      expect(color).toEqual('rgba(17,34,51,0.7)');
    });

    it('should convert "#rrggbbaa"', () => {
      const color = processColor('#1e83c9AA');
      expect(color).toEqual('rgba(30,131,201,0.7)');
    });
  });

  describe('color int', () => {
    it('should convert 0xff0000ff', () => {
      const color = processColor(0xff0000ff);
      expect(color).toEqual('rgba(255,0,0,1)');
    });
  });
});
