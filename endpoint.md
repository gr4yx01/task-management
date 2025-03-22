1. API Endpoints
These are the REST API endpoints for managing tasks, users, and related actions.

User Authentication & Management
POST /auth/register - Register a new user.
POST /auth/login - Login with credentials and obtain a JWT token.
GET /auth/me - Get the current logged-in user's profile.

Task Management
POST /tasks - Create a new task (requires authentication).

Request Body: { title, description, started_at, deadline, status, workspace_id }
Response: { success, message, data: { task details } }
GET /tasks - Get all tasks for the authenticated user (with pagination and filters).

Query Params: status, workspace_id, assigned_to, due_date_range
Response: { success, message, data: [task1, task2, ...] }
GET /tasks/:taskId - Get details of a specific task by taskId.

Response: { success, message, data: { task details } }
PUT /tasks/:taskId - Update task details (requires authentication).

Request Body: { title, description, started_at, deadline, status, assigned_to }
Response: { success, message, data: { task details } }
DELETE /tasks/:taskId - Delete a task (requires authentication).

Response: { success, message }
PATCH /tasks/:taskId/publish - Publish a task (set is_published = true).

Response: { success, message, data: { task details } }
Workspace Management
POST /workspaces - Create a new workspace.

Request Body: { name, owner_id }
Response: { success, message, data: { workspace details } }
GET /workspaces - List all workspaces for the authenticated user.

Response: { success, message, data: [workspace1, workspace2, ...] }
GET /workspaces/:workspaceId - Get details of a specific workspace.

Response: { success, message, data: { workspace details } }
POST /workspaces/:workspaceId/invite - Invite a user to a workspace.

Request Body: { email }
Response: { success, message, data: { invite details } }
Real-Time Features
GET /tasks/:taskId/comments - Get comments for a specific task.

Response: { success, message, data: [comment1, comment2, ...] }
POST /tasks/:taskId/comments - Add a comment to a task (requires authentication).

Request Body: { text }
Response: { success, message, data: { comment details } }
GET /tasks/:taskId/notifications - Get real-time notifications related to a task (through WebSockets).

Admin Actions
GET /users - Get all users (admin role only).
Response: { success, message, data: [user1, user2, ...] }

POST /tasks/:taskId/assign - Assign a task to a user.
Request Body: { user_id }
Response: { success, message, data: { task details } }
