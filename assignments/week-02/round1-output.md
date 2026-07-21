
# FE-03 Round 1

## Prompt

```text
Build a settings form in React.
```

## AI Output

The prompt **"Build a settings form in React."** is a **vague prompt**. If you're using it as-is (for example, in the FlyRank Round One assignment), you would simply provide:

```text
Build a settings form in React.
```

If your goal is to actually build the component, here's a simple React example:

```jsx
import { useState } from "react";

export default function SettingsForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    theme: "light",
    notifications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Settings:", formData);
    alert("Settings saved!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "400px",
        margin: "2rem auto",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2>Settings</h2>

      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>

      <label>
        Theme
        <select
          name="theme"
          value={formData.theme}
          onChange={handleChange}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>

      <label>
        <input
          type="checkbox"
          name="notifications"
          checked={formData.notifications}
          onChange={handleChange}
        />
        Enable Notifications
      </label>

      <button type="submit">Save Settings</button>
    </form>
  );
}
```

If this is for the **FlyRank FE-03 assignment**, then **Round One** should use only the simple prompt:

```text
Build a settings form in React.
```

and **Round Two** should use a much more detailed prompt with TypeScript, Tailwind CSS, validation, accessibility, reusable components, and production-quality requirements.

## Analysis

### Strengths

- Generated a working React form.
- Used useState for state management.
- Included basic input fields.
- Form submission works.

### Weaknesses

- Uses JavaScript instead of TypeScript.
- No Tailwind CSS styling.
- No React Hook Form.
- No Zod validation.
- No accessibility improvements.
- No reusable component structure.
- No file location mentioned.
- No tests provided.
- Not production-ready.
