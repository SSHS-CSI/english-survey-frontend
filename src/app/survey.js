const React = require("react");
const ClassNames = require('classnames');
const propTypes = require('prop-types');
const { makeStyles, useTheme } = require('@material-ui/core/styles');

const Card = require('@material-ui/core/Card').default;

const Objective = require('./objective.js');
const Descriptive = require('./descriptive.js');

const mapStateToProps = state => {
    const { template } = state;

}

function survey({ template, ...props }) {
    return (
        <Card>
            {template.map((item, index) => {
                return (item.type === 'objective') ?
                <Objective key={ClassNames(item.type, index)} questionIndex={index + 1} content={item.content} selectCount={item.selectCount} />
                : <Descriptive key={ClassNames(item.type, index)} questionIndex={index + 1} content={item.content} />
            })}
        </Card>
    );
}

module.exports = survey;