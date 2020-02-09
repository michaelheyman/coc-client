import React, { Component } from 'react';
import { Button, Divider, Avatar, Typography, Dropdown, Menu } from 'antd';
const { Paragraph } = Typography;

class FacultyInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      faculty: {
        name: 'Faculty Name',
        email: 'none-specified',
        phone: '(000)-000-0000',
        departments: [{ department_id: 1, name: 'none' }],
        senate: 'Faculty Senate',
        job: 'Faculty Job',
        expertise: 'Faculty Expertise',
        id: -1,
      },
      departmentsAreLoaded: false,
    };
  }

  // TODO: update this method, as it is deprecated (CF1-140)
  componentWillReceiveProps(newProps) {
    let dropdownIsLoaded = newProps.departments.length !== 0;

    this.setState({
      faculty: newProps.faculty,
      departmentsAreLoaded: dropdownIsLoaded,
    });
  }

  onPhoneChange = facultyPhone => {
    console.log('Phone changed:', facultyPhone);
    if (facultyPhone !== this.state.faculty.phone) {
      // Check to see if data was actually changed
      this.props.enableSaveChangesButton(
        facultyPhone,
        this.state.faculty.senate,
        null
      );
    }
  };

  onSenateChange = facultySenate => {
    // TODO: Change this to a dropdown like with committees and departments
    console.log('Senate changed:', facultySenate);
    if (facultySenate !== this.state.faculty.senate) {
      // Check to see if data was actually changed
      this.props.enableSaveChangesButton(
        this.state.faculty.phone,
        facultySenate,
        null
      );
    }
  };

  createDepartmentMenu() {
    const departmentsDropdownMenu = this.props.departments.map(department => (
      <Menu.Item key={department.id}>
        <Button type="link">{department.name}</Button>
      </Menu.Item>
    ));
    return <Menu>{departmentsDropdownMenu}</Menu>;
  }

  renderFacultyInfo() {
    const departments = this.createDepartmentMenu();
    const localDepts = this.state.faculty.departments.map(department => (
      <li key={department.department_id}>
        {department.name}
        <Button
          type="link"
          onClick={() => {
            this.props.removeDepartment(department);
          }}
          size="small"
        >
          x
        </Button>
      </li>
    ));

    return (
      <span>
        <h1>
          <Avatar size={64} icon="user" />
          <Divider type="vertical" />
          {this.state.faculty.name}
          <Divider type="vertical" />
          <i className="text-style">{this.state.faculty.job}</i>
          <Divider type="vertical" />
          <span className="text-style">{this.state.faculty.expertise}</span>
          <Divider type="vertical" />
          <Button type="link" onClick={() => this.props.sayHello()} size="small">
            Change
          </Button>
        </h1>
        <div style={{ fontSize: '90%' }}>
          <b>Senate: </b>
          <Paragraph
            style={{ display: 'inline' }}
            editable={{ onChange: this.onSenateChange }}
          >
            {this.state.faculty.senate}
          </Paragraph>
          <Divider type="vertical" />
        </div>
        <Divider type="horizontal" orientation="left">
          Contact Information
        </Divider>
        <div className="text-style">
          <ul>
            <li>{this.state.faculty.email + '\n'}</li>
            <li>
              <Paragraph editable={{ onChange: this.onPhoneChange }}>
                {this.state.faculty.phone}
              </Paragraph>
            </li>
          </ul>
          <Divider type="horizontal" orientation="left">
            Departments
          </Divider>
          <ul>
            {localDepts}
            {/*TODO: make button have departments in the dropdown, and disabled when no faculty member is selected*/}
            <Dropdown
              overlay={departments}
              disabled={!this.state.departmentsAreLoaded}
            >
              <Button type="link" icon="down" size="small">
                Add
              </Button>
            </Dropdown>
          </ul>
        </div>
      </span>
    );
  }

  render() {
    return <React.Fragment>{this.renderFacultyInfo()}</React.Fragment>;
  }
}

export default FacultyInfo;
