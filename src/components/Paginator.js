import React from "react";

class Paginator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1 };

    const { totalColors = null, pageLimit = 30, pageNeightbors = 0 } = props;

    this.pageLimit = typeof pageLimit === "number" ? pageLimit : 30;
    this.totalColors = typeof totalColors === "number" ? totalColors : 0;
    this.pageNeightbors =
      typeof pageNeightbors === "number"
        ? Math.max(0, Math.min(pageNeightbors, 2))
        : 0;
    this.totalPages = Math.ceil(this.totalColors / this.pageLimit);

    this.LEFT_PAGE = "LEFT";
    this.RIGHT_PAGE = "RIGHT";

    this.goToPage = this.goToPage.bind(this);
    this.range = this.range.bind(this);
    this.getPageNumbers = this.getPageNumbers.bind(this);
  }

  componentDidMount() {
    this.goToPage(1);
  }

  goToPage(page) {
    const currentPage = Math.max(0, Math.min(page, this.totalPages));

    const paginatorData = {
      currentPage,
      totalPages: this.totalPages,
      pageLimit: this.pageLimit
    };

    this.setState(
      { currentPage: currentPage },
      this.props.onPageChange(paginatorData)
    );
  }

  handleClick = page => {
    debugger;
    this.goToPage(page);
  };

  handlePageLeft = page => {
    debugger;
    this.goToPage(this.state.currentPage - this.state.pageNeightbors * 2 - 1);
  };

  handlePageRight = page => {
    debugger;
    this.goToPage(this.state.currentPage - this.state.pageNeightbors * 2 + 1);
  };

  range(from, to, step = 1) {
    let i = from;
    const range = [];
    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  }

  getPageNumbers() {
    const totalPages = this.totalPages;
    const currentPage = this.state.currentPage;
    const pageNeightbors = this.pageNeightbors;

    const totalNumbers = this.pageNeightbors * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeightbors);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeightbors);

      let pages = this.range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = this.range(startPage - spillOffset, startPage - 1);
          pages = [this.LEFT_PAGE, ...extraPages, ...pages];
          break;
        }
        case !hasLeftSpill && hasRightSpill: {
          const extraPages = this.range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, this.RIGHT_PAGE];
          break;
        }
        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [this.LEFT_PAGE, ...pages, this.RIGHT_PAGE];
          break;
        }
      }

      return [1, ...pages, totalPages];
    }

    return this.range(1, totalPages);
  }

  render() {
    if (!this.totalColors || this.totalPages === 1) return null;

    const { currentPage } = this.state;

    const pages = this.getPageNumbers();

    return (
      <React.Fragment>
        <div>
          <ul className="paginator">
            {pages.map((page, index) => {
              if (page === this.LEFT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={this.handlePageLeft}
                    />
                    <span>&laquo;</span>
                  </li>
                );

              if (page === this.RIGHT_PAGE)
                return (
                  <li key={index} className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      onClick={this.handlePageRight}
                    />
                    <span>&raquo;</span>
                  </li>
                );

              return (
                <li key={index} className={`page-item`}>
                  <a
                    className="page-link"
                    href="#"
                    onClick={this.handleClick}
                  />
                  {page}
                </li>
              );
            })}
          </ul>
        </div>
      </React.Fragment>
    );
  }
}

// Paginator.PropTypes = {};

export default Paginator;
