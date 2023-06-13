import PropTypes from 'prop-types';
import CardItem from "./CardItem.jsx";

const CardComponents = props => {
  const { config: cards } = props


  return (
    <>
      {cards.map((card, idx) => {
        const { header, items } = card;

        return (
          <section
            className="export-card"
            key={`card-${idx}`}
          >
            <section className="export-block">
              <h3 className="row-item-header">
                {header}
              </h3>
              {items.map((itemProps, idx) => {

                return (
                  <CardItem key={`item-${idx}`} {...itemProps} />
                )
              })}
            </section>
          </section>
        )
      })}
    </>
  )
}

CardComponents.propTypes = {
  config: PropTypes.array
};
export default CardComponents