import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required()
    }
  },
  // POST /api/posts
  createPost: {
    body: {
      title: Joi.string().required(),
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // UPDATE /api/posts/:postId
  updatePost: {
    body: {
      title: Joi.string().required(),
    },
    params: {
      postId: Joi.string().hex().required()
    }
  },

  // POST /api/users/changePassword or /api/employees/changePassword
  changePassword: {
    body: {
      newPassword: Joi.string().required(),
      currentPassword: Joi.string().required(),
      confirmPassword: Joi.string().required()
    }
  },

  // POST /api/users/changeRecoverPassword or /api/employees/changeRecoverPassword
  changeRecoverPassword: {
    body: {
      newPassword: Joi.string().required(),
      confirmPassword: Joi.string().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      // email: Joi.string().required(),
      password: Joi.string().required(),
      entityType: Joi.string().required()
    }
  },

  // POST /api/employees
  createEmployee: {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().required()
    }
  },

  // UPDATE /api/employees/:employeeId
  updateEmployee: {
    body: {
      username: Joi.string()
    },
    params: {
      employeeId: Joi.string().hex().required()
    }
  },

  //POST /api/leaves
  createLeave: {
    body: {
      // employeeName: Joi.string().trim().required(),
      leaveType: Joi.string().trim().required(),
      reason: Joi.string().trim().required(),
      fromDate: Joi.string().trim().required(),
      // toDate: Joi.string().trim().required()
    }
  },

  //UPDATE /api/leaves/:leaveId
  updateLeave: {
    body: {
      // employeeName: Joi.string().trim(),
      leaveType: Joi.string().trim(),
      reason: Joi.string().trim(),
      fromDate: Joi.string().trim(),
      // toDate: Joi.string().trim()
    }
  },
  //post /api/companies
  createCompany: {
    body: {
      name: Joi.string().required(),
      address: Joi.string().required(),
      email: Joi.string().required(),
      contactNumber: Joi.required(),
      status: Joi.required()
    }
  },

  //update /api/companies/:companyId
  updateCompany: {
    body: {
      name: Joi.string(),
      address: Joi.string(),
      email: Joi.string(),

    }
  },
  // POST /api/projects
  createProject: {
    body: {
      name: Joi.string().required(),
      startDate: Joi.string().required(),
      teamLead: Joi.required(),
      prefix: Joi.required(),
      // status: Joi.required()
    }
  },
  // Put /api/projects:projectId
  updateProject: {
    body: {
      name: Joi.string(),
      startDate: Joi.string(),
    }
  },
  // POST /api/tasks
  createTask: {
    body: {
      //projectName: Joi.string().required(),
      name: Joi.string().required(),
      // comments: Joi.string().required(),
      startDate: Joi.string().required(),
      // estimatedHours: Joi.number().required(),
      // priority: Joi.string().required(),
      // assignedTo: Joi.required(),
      status: Joi.string().required(),
    }
  },

  //Post /api/tasks :taskId
  updateTask: {
    body: {
      projectName: Joi.string(),
      name: Joi.string(),
      comments: Joi.string(),
      startDate: Joi.string(),
      // estimatedHours: Joi.number(),
      // priority: Joi.string(),
      // assignedTo: Joi.required(),
      status: Joi.string(),
    }
  },
  // POST /api/templates
  createTemplate: {
    body: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      phone: Joi.required(),
      description: Joi.string().required()
    }
  },
  // Put /api/templates:templateId
  updateTemplate: {
    body: {
      name: Joi.string(),
      email: Joi.string(),
      phone: Joi.number(),
      description: Joi.string()
    }
  },

  // POST /api/events
  createEvent: {
    body: {
      // contextId: Joi.required(),
      contextType: Joi.string().required(),
      eventType: Joi.string().required()
    }
  },

  // Put /api/templates:templateId
  updateEvent: {
    body: {
      contextType: Joi.string(),
      eventType: Joi.string()
    }
  },
  // POST /api/tasks
  createIssue: {
    body: {
      projectName: Joi.string().required(),
      name: Joi.string().required(),
      comments: Joi.string().required(),
      startDate: Joi.string().required(),
      estimatedHours: Joi.number().required(),
      priority: Joi.string().required(),
      // assignedTo: Joi.required(),
      status: Joi.string().required(),
    }
  },
};
