import { Component } from 'react'
import {
  InstantSearch,
  Hits,
  SearchBox,
  Highlight,
  RefinementList,
  CurrentRefinements,
  ClearAll,
  Pagination
} from 'react-instantsearch/dom'
import qs from 'qs'
import Router from 'next/router'

const Product = ({ hit }) => {
  return (
    <div style={{ marginTop: '10px' }}>
      <span className="hit-name">
        <Highlight attributeName="name" hit={hit} />
      </span>
    </div>
  )
}

const searchStateToUrl = searchState => (searchState ? `${window.location.pathname}?${qs.stringify(searchState)}` : '')

export default class IS extends Component {
  state = {
    searchState: { ...qs.parse(window.location.search.slice(1)) }
  }

  componentWillReceiveProps() {
    this.setState({ searchState: qs.parse(window.location.search.slice(1)) })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !isEqual(this.state.searchState, nextState.searchState)
  }

  onSearchStateChange(searchState) {
    const href = searchStateToUrl(searchState)
    Router.push(href, href, {
      shallow: true
    })
  }

  render() {
    return (
      <InstantSearch
        appId="latency"
        apiKey="3d9875e51fbd20c7754e65422f7ce5e1"
        indexName="bestbuy"
        searchState={this.state.searchState}
        onSearchStateChange={state => this.onSearchStateChange(state)}
        createURL={state => searchStateToUrl(state)}
      >
        <SearchBox />
        <ClearAll />
        <CurrentRefinements />

        <RefinementList attributeName="category" />
        <Hits hitComponent={Product} />
        <Pagination />
        {/* Search widgets will go there */}
      </InstantSearch>
    )
  }
}
