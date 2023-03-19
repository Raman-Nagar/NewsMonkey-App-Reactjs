import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";

// Previous and Next button logic in NewsMonkey

export class News extends Component {
  static defaultProps = { country: "in", pageSize: 5, category: "general" };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `${this.capializeFirstLetter(this.props.category)}-NewsMonkey`;
  }

  capializeFirstLetter=(string)=>{
    return string.charAt(0).toUpperCase()+string.slice(1);
}
  async componentDidMount() {
    await this.updateNews();
  }

  async updateNews() {
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    this.setState({
      loading: false,
    });
    let res = await data.json();
    this.setState({
      articles: res.articles,
      totalResults: res.totalResults,
      loading: true,
    });
  }

  nextClick = async () => {
    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      this.setState({ page: this.state.page + 1 });
      await this.updateNews();
    }
  };
  prevClick = async () => {
    this.setState({ page: this.state.page - 1 });
    await this.updateNews();
  };

  render() {
    return (
      <>
        <div className="container mb-3" style={{marginTop:"50px"}}>
          <h1 className="text-center mb-3" style={{marginTop:"80px"}}>NewsMonkey - Top {this.capializeFirstLetter(this.props.category)} HeadLines</h1>
          {!this.state.loading && <Spinner />}
          <div className="row">
            {this.state.loading &&
              this.state.articles.map((elem) => {
                return (
                  <div className="col-md-4" key={elem.url}>
                    <NewsItem
                      title={elem.title ? elem.title : ""}
                      description={elem.description ? elem.description : ""}
                      imgurl={elem.urlToImage ? elem.urlToImage : ""}
                      newsurl={elem.url}
                      author={elem.author}
                      date={elem.publishedAt}
                      source={elem.source.name}
                    />
                  </div>
                );
              })}
          </div>
          <div className="container d-flex justify-content-between">
            <button
              disabled={this.state.page <= 1}
              className="btn btn-dark"
              onClick={this.prevClick}
            >
              &larr;
            </button>
            <button
              disabled={
                this.state.page >=
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              className="btn btn-dark"
              onClick={this.nextClick}
            >
              &rarr;
            </button>
          </div>
        </div>
      </>
    );
  }
}

export default News;
