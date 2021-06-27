import annotations from "../annotations";
import escapeStringRegexp from "escape-string-regexp";
import data from 'emoji-mart/data/all.json'

const images = require.context("../../public/emojis", true);

const getEscapedKeys = (hash) => (hash).map(x => escapeStringRegexp(x)).join("|");

const formatAnnotate = getEscapedKeys(annotations);

const renderToEmoji = (text) => {

  let delimiter = new RegExp(`(:(?:${formatAnnotate}):)`, "g")
  return text.split(delimiter).map((word,i) => {
    let match = word.match(delimiter);
    if (match) {
      let emojiText = match[0].replace(/:/g,"")
      let emojiData = data["emojis"][emojiText]
      try {
        let imagePath = images(`./${emojiData.unified.toLowerCase()}.svg`).default
        return (
          <img 
            src={imagePath} 
            alt={match} 
            key={i}
            style={{height: "20px", width: "20px"}}
            draggable={false}
          />
        )
      } catch(e) {}
      
    }
    return word
  })
}
export default renderToEmoji;