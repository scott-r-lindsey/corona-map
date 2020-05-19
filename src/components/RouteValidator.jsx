import React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import Main from './index';
import { home } from '../lib/config';
import updateUrl from '../lib/mapUrl';

const validModes = ['COVID-COUNTY', 'COVID-US'];
const validAxes = ['deaths', 'confirmed'];
const validQuants = ['total', 'percap', 'change'];

const RouteValidator = (props) => {
  const params = useParams();
  const { data } = props;
  const {
    mode, location, when, axis, quant,
  } = params;

  // validate mode
  if (!validModes.includes(mode)) {
    return (
      <Redirect to={home} />
    );
  }

  // validate axes
  if (!validAxes.includes(axis)) {
    return (
      <Redirect to={home} />
    );
  }

  // validate quant
  if (!validQuants.includes(quant)) {
    return (
      <Redirect to={home} />
    );
  }

  const modeData = mode === 'COVID-COUNTY'
    ? data.county
    : data.state;

  const locationNames = mode === 'COVID-COUNTY'
    ? Object.entries(data.county.location).map((s) => (s[1].name.toLowerCase()))
    : Object.entries(data.state.location).map((s) => (s[1].name.toLowerCase()));

  const updates = {};

  // validate location
  if (!locationNames.includes(location)) {
    updates.location = 'united states';
  }

  // validate when
  if (!(
    when === 'now'
      || when.match(/^-[\d]+$/)
      || when.match(/^([\d]+)-([\d]+)$/)
  )) {
    updates.when = 'now';
  }
  if (when.match(/^-[\d]+$/)) {
    if (modeData.dates.length < (-1 * when)) {
      updates.when = 'now';
    }
  }

  // redirect if appropriate
  if (Object.keys(updates).length) {
    const url = updateUrl(params, updates);

    return (
      <Redirect to={url} />
    );
  }

  return (
    <Main data={modeData} />
  );
};

export default RouteValidator;

RouteValidator.propTypes = exact({
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired,
});
