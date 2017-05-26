import AppText from '../AppText';
import TweetTextPart from '../TweetTextPart';
import React, { PropTypes } from 'react';

class TweetText extends React.Component {
  static displayName = 'TweetText';

  static propTypes = {
    displayMode: TweetTextPart.propTypes.displayMode,
    lang: PropTypes.string,
    numberOfLines: PropTypes.number,
    textParts: PropTypes.array.isRequired
  };

  render() {
    const { displayMode, lang, numberOfLines, textParts, ...other } = this.props;

    return (
      <AppText {...other} lang={lang} numberOfLines={numberOfLines}>
        {textParts.map((part, i) => (
          <TweetTextPart displayMode={displayMode} key={i} part={part} />
        ))}
      </AppText>
    );
  }
}

export default TweetText;
