import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const CardItem = props => {
  const { content, onClick, btnContent } = props

  return (
    <section className="row-item">
      <div className="export-content">
        {content}
      </div>
      <button
        className="export-btn"
        onClick={onClick}
      >
        <FontAwesomeIcon
          icon={faDownload}
          className="icon-in-btn"
        />
        <span>{btnContent}</span>
      </button>
    </section>
  )
}


CardItem.propTypes = {
  content: PropTypes.string,
  onClick: PropTypes.func,
  btnContent: PropTypes.string,
};

export default CardItem