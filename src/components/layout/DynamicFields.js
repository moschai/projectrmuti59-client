import React, { Component, Fragment } from "react";
import { Form, Icon, Button } from "antd";
import PropTypes from "prop-types";

class DynamicFields extends Component {
  id = 1;

  add = () => {
    const { getFieldValue, setFieldsValue, name } = this.props,
      keys = getFieldValue(`${name}List`),
      nextKeys = keys.concat(this.id++);

    setFieldsValue({
      [`${name}List`]: nextKeys,
    });
  };

  remove = (k) => () => {
    const { getFieldValue, setFieldsValue, name } = this.props,
      keys = getFieldValue(`${name}List`);

    if (keys.length === 1) return;
    setFieldsValue({
      [`${name}List`]: keys.filter((key) => key !== k),
    });
  };

  defaultValidation = (name) => ({
    validateTrigger: ["onChange", "onBlur"],
    rules: [
      {
        required: true,
        whitespace: true,
        message: `Please input ${name}.`,
      },
    ],
  });

  addMultipleFields = () => {
    const { getFieldValue, fields, name } = this.props;
    //  getFieldDecorator(`${name}List`, { initialValue: [0] });
    console.log(getFieldValue);
    const fieldCounter = getFieldValue("tables");
    console.log(fields);

    return fieldCounter.reduce((preResult, k) => {
      const row = fields.map((obj, i) => (
        <Form.Item
          key={`${k}${obj.name}`}
          name={`${name}[${k}][${obj.name}]`}
          rules={obj.validation || this.defaultValidation(name)}
        >
          {obj.field()}
          {/* {getFieldDecorator(
            `${name}[${k}][${obj.name}]`,
            obj.validation || this.defaultValidation(name)
          )(obj.field())} */}
          {fieldCounter.length > 1 && fields.length - 1 === i ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              onClick={this.remove(k)}
            />
          ) : null}
        </Form.Item>
      ));

      return [...preResult, ...row];
    }, []);
  };

  render() {
    const { name } = this.props;
    return (
      <Fragment>
        {this.addMultipleFields()}

        <Form.Item>
          <Button type="dashed" onClick={this.add} style={{ width: "60%" }}>
            <Icon type="plus" /> Add &nbsp; {name}
          </Button>
        </Form.Item>
      </Fragment>
    );
  }
}

DynamicFields.propTypes = {
  name: PropTypes.string.isRequired,
  fields: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
    //TODO: add object shape validation.
  ]).isRequired,
  getFieldValue: PropTypes.func.isRequired,
  setFieldsValue: PropTypes.func.isRequired,
};

export default DynamicFields;
