import React, { Component } from "react";
import axios from "axios";
import Card from "./Card";
import "./Deck.css";
let API_BASE_URL = "https://deckofcardsapi.com/api/deck/";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deck: "",
      drawnCards: [],
    };
    this.getCard = this.getCard.bind(this);
  }

  async componentDidMount() {
    let deckUrl = await axios.get(`${API_BASE_URL}new/shuffle`);

    this.setState({
      deck: deckUrl.data,
    });
  }

  async getCard() {
    let cardUrl = await axios.get(
      `${API_BASE_URL}${this.state.deck.deck_id}/draw/`
    );

    try {
      if (cardUrl.data.success) {
        let card = cardUrl.data.cards[0];
        this.setState((st) => ({
          drawnCards: [
            ...st.drawnCards,
            {
              id: card.code,
              image: card.image,
              name: `${card.value} of ${card.suit}`,
            },
          ],
        }));
        console.log(cardUrl.data);
      } else {
        throw new Error("No cards left in the deck");
      }
    } catch (err) {
      console.log(err);
      alert("There's no more cards left in the deck");
    }
  }

  //   This is all about React lifecycle. If we set up the angle stuff in the 'render()', each time we clicked in 'Get Card!' button, all the cards would change their position.
  render() {
    const displayCard = this.state.drawnCards.map((c) => (
      <Card image={c.image} name={c.name} key={c.id} />
    ));
    return (
      <div className="Deck">
        <h1 className="Deck-title">♦Card Dealer♦</h1>
        <h2 className="Deck-title subtitle">♦A little demo made with React♦</h2>
        <button className="Deck-btn" onClick={this.getCard}>Get Card !</button>
        <div className="Deck-cardArea">{displayCard}</div>
      </div>
    );
  }
}
export default Deck;
