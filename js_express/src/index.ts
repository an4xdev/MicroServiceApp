import express from "express";
import { initModels } from "../models/init-models";
const app = express();
const port = process.env.PORT || 6713;

import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'JS Express Service API',
      version: '1.0.0',
      description: 'Documentation for JS Express Service API',
    },
    servers: [
      {
        url: 'http://localhost:6713',
        description: 'Development server',
      }
    ]
  },
  apis: ['./src/index.ts']
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://postgres:P@ssword123!@database:5432/project", {
  dialect: "postgres",
  logging: false,
});

const models = initModels(sequelize);

app.get("/test", (req, res) => {
  res.json({
    message: "Hello from Express!",
    timestamp: new Date().toISOString(),
  });
});

/**
 * @openapi
 * /api/taskTypes:
 *   get:
 *     summary: Get all task types
 *     responses:
 *       200:
 *         description: List of task types
 *       404:
 *        description: No task types found
 */

app.get("/api/taskTypes", async (req, res) => {
  const { TaskTypes } = models;
  try {
    const taskTypes = await TaskTypes.findAll();
    if (!taskTypes || taskTypes.length === 0) {
      res.status(404).json({ message: "No task types found" });
    }
    res.json(taskTypes);
  } catch (error) {
    console.error("Error fetching task types:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/taskTypes", async (req, res) => {
  const { TaskTypes } = models;
  const { name } = req.body;
  try {
    const taskType = await TaskTypes.create({
      Name: name
    });
    res.status(201).json(taskType);
  } catch (error) {
    console.error("Error creating task type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/taskTypes/:id", async (req, res) => {
  const { TaskTypes } = models;
  const { id } = req.params;
  try {
    const taskType = await TaskTypes.findByPk(id);
    if (!taskType) {
      res.status(404).json({ message: "Task type not found" });
      return;
    }
    res.json(taskType);
  }
  catch (error) {
    console.error("Error fetching task type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/taskTypes/:id", async (req, res) => {
  const { TaskTypes } = models;
  const { id } = req.params;
  const { name } = req.body;
  try {
    const taskType = await TaskTypes.findByPk(id);
    if (!taskType) {
      res.status(404).json({ message: "Task type not found" });
      return;
    }
    taskType.Name = name;
    await taskType.save();
    res.json(taskType);
  }
  catch (error) {
    console.error("Error updating task type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/taskTypes/:id", async (req, res) => {
  const { TaskTypes } = models;
  const { id } = req.params;
  try {
    const taskType = await TaskTypes.findByPk(id);
    if (!taskType) {
      res.status(404).json({ message: "Task type not found" });
      return;
    }
    await taskType.destroy();
    res.status(204).send();
  }
  catch (error) {
    console.error("Error deleting task type:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/companies", async (req, res) => {
  const { Companies } = models;
  try {
    const companies = await Companies.findAll();
    if (!companies || companies.length === 0) {
      res.status(404).json({ message: "No companies found" });
    }
    res.json(companies);
  } catch (error) {
    console.error("Error fetching companies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/companies/:id", async (req, res) => {
  const { Companies } = models;
  const { id } = req.params;
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }
    res.json(company);
  }
  catch (error) {
    console.error("Error fetching company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/companies", async (req, res) => {
  const { Companies } = models;
  const { name } = req.body;
  try {
    const company = await Companies.create({
      Name: name
    });
    res.status(201).json(company);
  } catch (error) {
    console.error("Error creating company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/companies/:id", async (req, res) => {
  const { Companies } = models;
  const { id } = req.params;
  const { name } = req.body;
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }
    company.Name = name;
    await company.save();
    res.json(company);
  }
  catch (error) {
    console.error("Error updating company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/companies/:id", async (req, res) => {
  const { Companies } = models;
  const { id } = req.params;
  try {
    const company = await Companies.findByPk(id);
    if (!company) {
      res.status(404).json({ message: "Company not found" });
      return;
    }
    await company.destroy();
    res.status(204).send();
  }
  catch (error) {
    console.error("Error deleting company:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/managers", async (req, res) => {
  const { Users } = models;
  try {
    const managers = await Users.findAll({ where: { Role: "manager" } });
    if (!managers || managers.length === 0) {
      res.status(404).json({ message: "No managers found" });
    }
    res.json(managers);
  } catch (error) {
    console.error("Error fetching managers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/managers/:id", async (req, res) => {
  const { Users } = models;
  const { id } = req.params;
  try {
    const manager = await Users.findOne(
      {
        where: {
          Role: "manager",
          Id: id
        }
      });
    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }
    res.json(manager);
  }
  catch (error) {
    console.error("Error fetching manager:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/managers", async (req, res) => {
  // TODO: propably send request to Auth Service to create manager
});

app.put("/api/managers/:id", async (req, res) => {
  const { Users } = models;
  const { id } = req.params;
  const { name } = req.body;
  try {
    const manager = await Users.findOne(
      {
        where: {
          Role: "manager",
          Id: id
        }
      });
    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }
    manager.Username = name;
    await manager.save();
    res.json(manager);
  }
  catch (error) {
    console.error("Error updating manager:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/api/managers/:id", async (req, res) => {
  const { Users } = models;
  const { id } = req.params;
  try {
    const manager = await Users.findOne(
      {
        where: {
          Role: "manager",
          Id: id
        }
      });
    if (!manager) {
      res.status(404).json({ message: "Manager not found" });
      return;
    }
    await manager.destroy();
    res.status(204).send();
  }
  catch (error) {
    console.error("Error deleting manager:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.put("/api/sprints/:id/assignManager", async (req, res) => {
  const { Sprints } = models;
  const { id } = req.params;
  const { managerId } = req.body;
  try {
    const sprint = await Sprints.findByPk(id);
    if (!sprint) {
      res.status(404).json({ message: "Sprint not found" });
      return;
    }
    sprint.ManagerId = managerId;
    await sprint.save();
    res.json(sprint);
  }
  catch (error) {
    console.error("Error assigning manager to sprint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Serwer is working on port: ${port}`);
});
