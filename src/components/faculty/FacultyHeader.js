import { Button, Descriptions, Divider, PageHeader } from 'antd';
import React, { Component } from 'react';

/**
 * Builds a name in the format Surname, Forename.
 *
 * @param fullName    Full name to split and build
 * @returns {string}  Full name in "Surname, Forename" format
 */
const buildSurnameForename = fullName => {
  const firstName = fullName
    .split(' ')
    .slice(0, -1)
    .join(' ');
  const lastName = fullName
    .split(' ')
    .slice(-1)
    .join(' ');

  if (!firstName) {
    return lastName;
  }

  return `${lastName}, ${firstName}`;
};

export default class FacultyHeader extends Component {
  render() {
    const name = buildSurnameForename(this.props.faculty.name);
    const { email, job, phone } = this.props.faculty;

    return (
      <div>
        <PageHeader
          title={name}
          style={{ paddingLeft: 0 }}
          extra={[
            <Button key="1" type="primary" onClick={() => alert('TODO')}>
              Edit
            </Button>,
          ]}
          avatar={{ icon: 'user' }}
        />
        <Divider type="horizontal" orientation="left">
          Info
        </Divider>
        <Descriptions size="small" column={2}>
          <Descriptions.Item label="Email">
            <a href={`mailto:${email}`}>{email}</a>
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{phone}</Descriptions.Item>
          <Descriptions.Item label="Title">{job}</Descriptions.Item>
        </Descriptions>
        <Divider type="horizontal" orientation="left" />
      </div>
    );
  }
}
