import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'E-Commerce API',
    description: 'API Documentation for E-Commerce System with Products, Orders, and Shops'
  },

  host: 'localhost:5000',
  schemes: ['http'],

  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header'
    }
  },

  //  THIS IS THE IMPORTANT ADDITION
  security: [
    {
      bearerAuth: []
    }
  ],

  definitions: {
    Product: {
      type: 'object',
      required: ['name', 'size', 'price', 'shop_id'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        name: {
          type: 'string'
        },
        size: {
          type: 'string'
        },
        price: {
          type: 'string'
        },
        type: {
          type: 'string',
          enum: ['gabo', 'abana'],
          default: 'gabo'
        },
        description: {
          type: 'string'
        },
        image: {
          type: 'string'
        },
        status: {
          type: 'string',
          enum: ['available', 'hold_in_stock', 'unAvailable'],
          default: 'available'
        },
        shop_id: {
          type: 'string',
          format: 'uuid'
        },
        quantity: {
          type: 'integer',
          default: 0,
          description: 'Available stock quantity'
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    Order: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        userId: {
          type: 'string',
          format: 'uuid'
        },
        productId: {
          type: 'string',
          format: 'uuid'
        },
        sellerId: {
          type: 'string',
          format: 'uuid'
        },
        quantity: {
          type: 'integer',
          default: 1
        },
        status: {
          type: 'string',
          enum: ['pending', 'approved', 'denied'],
          default: 'pending'
        },
        orderDate: {
          type: 'string',
          format: 'date-time'
        },
        totalAmount: {
          type: 'number',
          format: 'decimal'
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    Shop: {
      type: 'object',
      required: ['name', 'description', 'contact', 'location'],
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        name: {
          type: 'string'
        },
        description: {
          type: 'string'
        },
        owner: {
          type: 'string',
          format: 'uuid'
        },
        contact: {
          type: 'string'
        },
        location: {
          type: 'string'
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        },
        updatedAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    Notification: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          format: 'uuid'
        },
        userId: {
          type: 'string',
          format: 'uuid'
        },
        title: {
          type: 'string'
        },
        message: {
          type: 'string'
        },
        type: {
          type: 'string',
          enum: ['new_order', 'order_approved', 'order_denied']
        },
        orderId: {
          type: 'string',
          format: 'uuid'
        },
        isRead: {
          type: 'boolean',
          default: false
        },
        createdAt: {
          type: 'string',
          format: 'date-time'
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./index.js'];

swaggerAutogen()(outputFile, endpointsFiles, doc);