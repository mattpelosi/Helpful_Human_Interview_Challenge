import React from "react";

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };

    const { totalRecords = null, pageLimit = 30, pageNeightbors = 0 } = props;
    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalRecords = typeof totalRecords === "number" ? totalRecords : 0;
    this.pageNeightbors =
      typeof pageNeightbors === "number"
        ? Math.max(0, Math.min(pageNeightbors, 2))
        : 0;
    this.totalPages = Math.ceil(this.totalRecords / this.pageLimit);

    this.goToPage = this.goToPage.bind(this);
  }

  componentDidMount() {
    this.goToPage(1);
  }

  goToPage(page) {
    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginatorData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit,
    };

    this.setState(
      { currentPage: currentPage },
      this.props.onPageChange(paginatorData)
    );
  }

  range(from, to, step = 1) {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
  }

  render() {
    return (
      <React.Fragment>
        <nav>
          <ul className="paginator" />
        </nav>
      </React.Fragment>
    );
  }
}

// Paginator.PropTypes = {};

export default Paginator;
