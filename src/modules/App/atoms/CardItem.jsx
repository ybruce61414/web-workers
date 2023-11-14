import PropTypes from 'prop-types';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";

const CardItem = props => {
  const { content, onClick, btnContent, disabled } = props

  return (
    <section className="row-item">
      <div className="export-content">
        {content}
      </div>
      <button
        className="export-btn"
        onClick={onClick}
        disabled={disabled}
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
  disabled: PropTypes.bool,
};

export default CardItem