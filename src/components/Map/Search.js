import React, { useContext, useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';
import VeilContext from '../../context/Veil';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { getLocationFips } from '../../lib/getMapValue';
import PropTypes from 'prop-types';
import exact from 'prop-types-exact';
import updateUrl from '../../lib/mapUrl.js';

const Search = (props) => {

  const {veil, setVeil} = useContext(VeilContext);
  const [visible, setVisible] = useState(false);
  const {data} = props;
  const history = useHistory()
  const locations = getLocationFips(data);
  const params = useParams();

  const searchTextRef = useRef(null)
  const autoRef = useRef(null)

  useEffect(() => {
    if (!veil){
      setVisible(false);
    }
  }, [veil]);

  useEffect(() => {
    if (visible){
      searchTextRef.current.focus();
    }
  }, [visible]);

  const handleClick = () => {
    setVeil(true);
    setVisible(true);
  };

  const handleChange = (evt, value) => {
    if ((value) && (value.title)) {
      history.push(updateUrl(params, {location: value.title.toLowerCase()}));
    }
  }

  const handleBlur = (event, value) => {
    setVisible(false);
    setVeil(false);
  }

  return (
    <>
      <div className="map-search">
        <Button onClick={handleClick}>
          <SearchIcon />
        </Button>
      </div>
      <div className="map-search-text" style={{display: visible ? 'block' : 'none' }}>
        <Autocomplete
          openOnFocus={true}
          clearOnEscape={true}
          ref={autoRef}
          style={{ width: 300}}
          options={locations}
          getOptionLabel={(option) => option.title}
          getOptionSelected={(option) => option.title}
          autoComplete={true}
          blurOnSelect={true}
          onBlur={handleBlur}
          onChange={handleChange}
          size="small"

          renderOption={(option) => (
            <>
              {option.title}
            </>
          )}

          renderInput={(params) => (
            <TextField
              inputRef={searchTextRef}
              {...params}
              label="Choose a Location"
              variant="outlined"
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
        />

      </div>
    </>

  );

}

export default Search;


Search.propTypes = exact({
  data: PropTypes.object.isRequired
});
