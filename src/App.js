
import './App.scss';
import React from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      color: ''
    }
    this.handleColorChange = this.handleColorChange.bind(this);
  }

  handleColorChange(color){
    this.setState({
      color: color
    })
  }

  render(){
    return(
      <div id="app" className={this.state.color}>
        <QuoteBox onChangeColor={this.handleColorChange} color={this.state.color}/>
      </div>
    )
  }
}

class QuoteBox extends React.Component {
  constructor(props){
    super(props);
    this.state={
      quoteText: '',
      quoteAuthor: '',
      tweetUrl: 'https://twitter.com/intent/tweet?text=',
      currColor: this.props.color
    }
    this.getNewQuote = this.getNewQuote.bind(this);
    this.handleNewQuote = this.handleNewQuote.bind(this);
  }

  getNewQuote(){
    const app = this;
    fetch('https://type.fit/api/quotes')
    .then((response) => response.json())
    .then((data) => {
      const index = Math.floor(Math.random() * data.length)
      app.setState({
        quoteText: data[index].text,
        quoteAuthor: data[index].author,
        tweetUrl: 'https://twitter.com/intent/tweet?text=' + data[index].text.replace(/ /g, '+')
      })
    })
  }

  handleNewQuote(){
    const colors = ['green', 'orange', 'red', 'purple', 'blue', 'gray'];
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    while(randomColor === this.state.currColor){
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    }
    this.props.onChangeColor(randomColor);
    this.getNewQuote();
  }

  render(){
    return(
      <div id="quote-box">
        <div id="quote-content">
          <div id="text">{this.state.quoteText}</div>
          <div id="author">{this.state.quoteAuthor}</div>
        </div>
        <button id="new-quote" onClick={this.handleNewQuote}>New Quote</button>
        <a href={this.state.tweetUrl} id="tweet-quote" target="_blank">New tweet</a>
      </div>
    )
  }
}

export default App;
