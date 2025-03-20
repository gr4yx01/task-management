CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',  -- user, admin
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    permission  Permission[]
)

CREATE TABLE permission (
    id SERIAL PRIMARY KEY,
    resource VARCHAR(255) NOT NULL,
    actions Action[]
)

CREATE TABLE workspaces (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner_id INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'pending', -- pending, in_progress, completed
    started_at TIMESTAMP,
    deadline TIMESTAMP,
    is_published BOOLEAN DEFAULT false,
    workspace_id INT REFERENCES workspaces(id),
    assigned_to INT REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id),
    user_id INT REFERENCES users(id),
    text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task_notifications (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id),
    user_id INT REFERENCES users(id),
    message TEXT,
    read BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE task_history (
    id SERIAL PRIMARY KEY,
    task_id INT REFERENCES tasks(id),
    status VARCHAR(50),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_invitations (
    id SERIAL PRIMARY KEY,
    workspace_id INT REFERENCES workspaces(id),
    email VARCHAR(255),
    invite_token VARCHAR(255) UNIQUE,
    is_accepted BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_workspaces (
    user_id INT REFERENCES users(id),
    workspace_id INT REFERENCES workspaces(id),
    role VARCHAR(50), -- admin, member
    PRIMARY KEY (user_id, workspace_id)
);

3. Example Data Models and Relationships:

Users
User 1: john@example.com, Role: Admin
User 2: jane@example.com, Role: User

Workspaces
Workspace 1: Team Project, Owner: User 1
Workspace 2: Design Team, Owner: User 1

Tasks
Task 1: Task 1, Status: Pending, Assigned to User 2
Task 2: Task 2, Status: In Progress, Assigned to User 1

Comments
Comment 1: Looks good to me! on Task 1 by User 2

Task History
Task 1 changed status from pending to in_progress

4. Real-Time Collaboration Design
For real-time collaboration, you can use WebSockets (via Socket.IO) to push updates to the front end whenever a task is updated or commented on. This includes:

Notifications: When a task is updated or a new comment is added, users who are working on that task will be notified in real time.
WebSocket Endpoints: You can have WebSocket events for things like "task_updated", "new_comment", etc., to notify users.