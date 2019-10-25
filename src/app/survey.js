const React = require("react");
const { connect } = require('react-redux');
const ClassNames = require('classnames');
const propTypes = require('prop-types');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Card = require('@material-ui/core/Card').default;

const { updateResponse } = require('./actions.js');
const Objective = require('./objective.js');
const Descriptive = require('./descriptive.js');

const mapStateToProps = state => {
    return {
        data: state.response
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateResponse: index => (_, value) => dispatch(updateResponse(value, index))
    }
}

function survey({ data, updateResponse }) {
    return (
        <Card>
            {data.map((item, index) => {
                return (item.type === 'objective') ?
                    <Objective
                        key={ClassNames(item.type, index)}
                        data={data[index]}
                        updateResponse={updateResponse(index)}
                        index={index}
                    />
                    : <Descriptive
                        key={ClassNames(item.type, index)}
                        data={data[index]}
                        updateResponse={updateResponse(index)}
                        index={index}
                    />
            })}
        </Card>
    );
}

const Survey = connect(
    mapStateToProps,
    mapDispatchToProps
)(survey)

module.exports = Survey;