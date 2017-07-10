import createRenderBenchmark from '../createRenderBenchmark';
import Tweet from '../src/components/Tweet';
import React from 'react';

const tweet1 = {
  favorite_count: 30,
  favorited: true,
  id: '834889712556875776',
  lang: 'en',
  retweet_count: 6,
  retweeted: false,
  textParts: [
    {
      prefix: '',
      text: 'Living burrito to burrito '
    },
    {
      emoji: 'https://abs-0.twimg.com/emoji/v2/svg/1f32f.svg',
      isEmoji: true,
      prefix: '',
      text: '🌯'
    },
    {
      emoji: 'https://abs-0.twimg.com/emoji/v2/svg/1f32f.svg',
      isEmoji: true,
      prefix: '',
      text: '🌯'
    },
    {
      emoji: 'https://abs-0.twimg.com/emoji/v2/svg/1f32f.svg',
      isEmoji: true,
      prefix: '',
      text: '🌯'
    }
  ],
  timestamp: 'Feb 23',
  user: {
    fullName: 'Nicolas',
    screenName: 'necolas',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/804365942360719360/dQnPejph_normal.jpg'
  }
};

const tweet2 = {
  favorite_count: 84,
  favorited: false,
  id: '730896800060579840',
  lang: 'en',
  media: {
    source: {
      uri: 'https://pbs.twimg.com/media/CiSqvsJVEAAtLZ1.jpg',
      width: 600,
      height: 338
    }
  },
  retweet_count: 4,
  retweeted: true,
  textParts: [
    {
      prefix: '',
      text: 'Presenting '
    },
    {
      displayUrl: 'mobile.twitter.com',
      expandedUrl: 'https://mobile.twitter.com',
      isEntity: true,
      isUrl: true,
      linkRelation: 'nofollow',
      prefix: '',
      text: '',
      textDirection: 'ltr',
      url: 'https://t.co/4hRCAxiUUG'
    },
    {
      prefix: '',
      text: ' with '
    },
    {
      isEntity: true,
      isMention: true,
      prefix: '@',
      text: 'davidbellona',
      textDirection: 'ltr',
      url: '/davidbellona'
    },
    {
      prefix: '',
      text: " at Twitter's all hands meeting "
    }
  ],
  timestamp: 'May 12',
  user: {
    fullName: 'Nicolas',
    screenName: 'necolas',
    profileImageUrl: 'https://pbs.twimg.com/profile_images/804365942360719360/dQnPejph_normal.jpg'
  }
};

const renderTweet = label =>
  createRenderBenchmark({
    name: `Tweet [${label}]`,
    runs: 10,
    getElement() {
      return (
        <div style={{ width: 500 }}>
          <Tweet tweet={tweet1} />
          <Tweet tweet={tweet2} />
        </div>
      );
    }
  });

export default renderTweet;
