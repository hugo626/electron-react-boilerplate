// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from '../components/Home';
import * as HomeActions from '../../../shared/actions/home';

const mapDispatchToProps = (dispatch) => (bindActionCreators(HomeActions, dispatch))

export default connect(
  null,
  mapDispatchToProps
)(Home);
