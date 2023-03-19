import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

// Load-More logic in NewsMonkey

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
      totalResults: 0,
    };
    document.title = `${this.capializeFirstLetter(
      this.props.category
    )}-NewsMonkey`;
  }

  capializeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  async componentDidMount() {
    await this.updateNews();
  }

  async updateNews() {
    this.props.changeProgress(10);
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
    this.props.changeProgress(100);
  }
  fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=${this.props.apikey}&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    let data = await fetch(url);
    let res = await data.json();
    this.setState({
      articles: this.state.articles.concat(res.articles),
      page: this.state.page + 1,
      totalResults: res.totalResults,
    });
  };

  render() {
    return (
      <>
        <div className="container mb-5" >
          <h1 className="text-center mb-3" style={{marginTop:"80px"}}>
            NewsMonkey - Top {this.capializeFirstLetter(this.props.category)}{" "}
            HeadLines
          </h1>
          {!this.state.loading && <Spinner />}
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length !== this.state.totalResults}
            loader={<Spinner />}
          >
            <div className="container" style={{ overflowX: "hidden" }}>
              <div className="row">
                {this.state.articles.map((elem, i) => {
                  return (
                    <div className="col-md-4" key={i}>
                      <NewsItem
                        title={elem.title ? elem.title : ""}
                        description={elem.description ? elem.description : ""}
                        imgurl={elem.urlToImage ? elem.urlToImage : "https://i.ndtvimg.com/i/2015-05/service-tax-generic_650x488_51432052895.jpg?im=FitAndFill,algorithm=dnn,width=1200,height=675?ver-20230302.111"}
                        newsurl={elem.url}
                        author={elem.author}
                        date={elem.publishedAt}
                        source={!elem.source.name?"Dainik Bhaskar":elem.source.name}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </InfiniteScroll>
        </div>
      </>
    );
  }
}

export default News;
