import React, {Component} from 'react';


export default class Pagination extends Component {
    constructor(){
        super();
    }
    render(){
        // let loading = this.props.loading;
        let currentPage = this.props.page;
        let anotherPage = this.props.morePages ;
        let nextPage = currentPage + 1;
        let previousPage = currentPage - 1;
        if (currentPage == 1  && anotherPage){
            return(
                <div>
                    <ul className="pagination center-align">
                        <li className="active"><a>{currentPage}</a></li>
                        <li className="waves-effect"><a onClick={() => this.props.changePage(nextPage)}>{nextPage}</a></li>
                    </ul>
                </div>
            )
        }else if (currentPage == 1 && !anotherPage) {
            return (
                <div>
                    <ul className="pagination center-align">
                        <li className="active"><a>{currentPage}</a></li>
                    </ul>
                </div>
            )
        } else if (!anotherPage) {
            return (
                <div>
                    <ul className="pagination center-align">
                        <li className="waves-effect"><a onClick={() => this.props.changePage(previousPage)}>{previousPage}</a></li>
                        <li className="active"><a>{currentPage}</a></li>
                    </ul>
                </div>
            )
        } else {
            return (
                <div>
                    <ul className="pagination center-align">
                        <li className="waves-effect"><a onClick={() => this.props.changePage(previousPage)}>{previousPage}</a></li>
                        <li className="active"><a>{currentPage}</a></li>
                        <li className="waves-effect"><a onClick={() => this.props.changePage(nextPage)}>{nextPage}</a></li>
                    </ul>
                </div>
            );
        }
    }
}