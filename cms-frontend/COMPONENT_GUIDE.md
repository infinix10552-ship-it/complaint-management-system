# UI Components & Styling Guide

## Quick Reference for Tailwind Classes Used

### Button Classes

#### Primary Button (CTA)
```jsx
<button className="btn-primary">Submit</button>
```
**Styling**: Gradient indigo-to-blue, white text, hover effect with shadow
**Use Case**: Main actions (Login, Register, Submit, Save)

#### Secondary Button
```jsx
<button className="btn-secondary">Cancel</button>
```
**Styling**: White background, gray text, border, hover effect
**Use Case**: Alternative actions, back buttons

---

### Card Components

#### Standard Card
```jsx
<div className="card">
  Content here
</div>
```
**Styling**: White background, rounded corners, subtle shadow, border
**Use Case**: Form containers, content sections, any grouped content

#### Stat Card
```jsx
<div className="stat-card">
  <h3>Label</h3>
  <p className="text-3xl font-bold">123</p>
</div>
```
**Styling**: Gradient from white to gray, hover shadow, professional feel
**Use Case**: Dashboard stats, KPIs, metrics display

#### Glassmorphism Card
```jsx
<div className="glass-card">
  Content here
</div>
```
**Styling**: Frosted glass with backdrop blur, white/20 border
**Use Case**: Auth pages, hero sections, overlay content

---

### Badge Classes

#### Success Badge
```jsx
<span className="badge-success">✓ Resolved</span>
```
**Color**: Emerald green background with darker text
**Use Case**: Completed, successful, resolved status

#### Pending Badge
```jsx
<span className="badge-pending">○ Open</span>
```
**Color**: Amber/yellow background with darker text
**Use Case**: In progress, waiting, open status

#### Error Badge
```jsx
<span className="badge-error">✕ Rejected</span>
```
**Color**: Red background with darker text
**Use Case**: Failed, rejected, error status

#### Info Badge
```jsx
<span className="badge-info">⟳ In Progress</span>
```
**Color**: Blue background with darker text
**Use Case**: Information, processing, active status

---

### Form Input Field

```jsx
<input 
  type="text"
  placeholder="Your input"
  className="input-field"
/>
```
**Styling**: Full width, padding, border with focus ring, transition
**Features**:
- Indigo focus ring (2px)
- Smooth transitions
- Placeholder text styling
- Works for text, email, password types

#### Variant with Icon
```jsx
<div className="relative">
  <Mail className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
  <input type="email" placeholder="Email" className="input-field pl-12" />
</div>
```

---

### Table Styling

#### Table Header
```jsx
<thead>
  <tr className="table-header">
    <th className="px-6 py-4 text-left font-semibold">Column</th>
  </tr>
</thead>
```
**Styling**: Gradient gray background, bold text, border-bottom

#### Table Body Rows
```jsx
<tbody className="divide-y divide-gray-100">
  <tr className="hover:bg-gray-50 transition-colors">
    <td className="px-6 py-4">Content</td>
  </tr>
</tbody>
```
**Styling**: Subtle dividers, hover effect, smooth transition

---

### Utility Classes Used

| Class | Purpose |
|-------|---------|
| `min-h-screen` | Full viewport height |
| `fixed left-0 top-0 w-64` | Sidebar positioning |
| `ml-64` | Left margin for main content (sidebar width) |
| `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4` | Responsive grid |
| `space-y-4` | Vertical spacing |
| `gap-6` | Gap between grid items |
| `flex items-center justify-between` | Flexbox centering |
| `rounded-lg` | Border radius |
| `shadow-md hover:shadow-lg` | Shadow elevation |
| `transition-all duration-300` | Smooth animations |
| `focus:outline-none focus:ring-2` | Focus states |
| `disabled:opacity-50` | Disabled state styling |

---

## Color System

### Primary Colors
- **Indigo 600**: `#4F46E5` - Primary actions, focus states
- **Blue 600**: `#2563EB` - Secondary, accents
- **Blue 50**: `#EFF6FF` - Light backgrounds

### Status Colors
- **Emerald 600**: `#059669` - Success, resolved
- **Amber 600**: `#D97706` - Warning, pending
- **Red 600**: `#DC2626` - Error, danger
- **Purple 600**: `#A855F7` - Info, highlight

### Neutral Colors
- **Gray 900**: `#111827` - Text, dark elements
- **Gray 700**: `#374151` - Secondary text
- **Gray 600**: `#4B5563` - Tertiary text
- **Gray 50**: `#F9FAFB` - Page background
- **White**: `#FFFFFF` - Cards, containers

---

## Layout Patterns

### Sidebar + Main Content
```jsx
<div>
  {/* Sidebar */}
  <div className="fixed left-0 top-0 w-64 h-screen bg-gradient-to-b from-gray-900 to-gray-900">
    {/* Navigation */}
  </div>
  
  {/* Main Content */}
  <div className="ml-64 p-8">
    {/* Page content */}
  </div>
</div>
```

### Centered Card (Auth Pages)
```jsx
<div className="min-h-screen bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center p-4">
  <div className="w-full max-w-md">
    <div className="glass-card p-8">
      {/* Form content */}
    </div>
  </div>
</div>
```

### Dashboard Grid
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  {/* Stat cards */}
</div>
```

---

## Typography

### Headings
```jsx
<h1 className="text-4xl font-bold text-gray-900">Main Title</h1>
<h2 className="text-2xl font-bold text-gray-900">Section Title</h2>
<h3 className="text-xl font-bold text-gray-900">Subsection</h3>
```

### Body Text
```jsx
<p className="text-gray-900">Regular text</p>
<p className="text-gray-600">Secondary text</p>
<p className="text-gray-500 text-sm">Tertiary/small text</p>
```

### Font Stack
- **Font Family**: Inter (from Google Fonts)
- **Base Size**: 16px
- **Line Height**: 1.5 (Tailwind default)

---

## Responsive Breakpoints

| Class Prefix | Min Width | Use Case |
|-------------|-----------|----------|
| (none) | 0px | Mobile first |
| `sm:` | 640px | Small tablets |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Desktops |
| `xl:` | 1280px | Large desktops |
| `2xl:` | 1536px | Extra large |

### Examples
```jsx
{/* 1 col mobile, 2 col tablet, 4 col desktop */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  
{/* Hide on mobile, show on tablet+ */}
<div className="hidden md:block">
  Visible on tablets and up
</div>

{/* Full width mobile, max width desktop */}
<div className="w-full max-w-4xl mx-auto">
  Max width container
</div>
```

---

## Animation & Transitions

### Built-in Transitions
- All elements: `transition-colors duration-200`
- Buttons: `transition-all duration-300`
- Cards: `transition-shadow duration-300`
- Hover effects: Smooth shadow elevation

### Common Hover Effects
```jsx
{/* Shadow elevation on hover */}
<div className="shadow-md hover:shadow-lg transition-shadow">

{/* Opacity change on hover */}
<button className="opacity-100 hover:opacity-90">

{/* Transform on hover */}
<div className="hover:scale-105 transition-transform">

{/* Color change on hover */}
<a className="text-blue-600 hover:text-blue-700">
```

---

## Accessibility Features

✓ **Focus States**: All interactive elements have focus rings
✓ **Color Contrast**: WCAG AA compliant
✓ **Semantic HTML**: Proper heading hierarchy
✓ **Icons + Text**: All icons paired with text labels
✓ **Form Labels**: All inputs have associated labels
✓ **Button States**: Disabled states clearly visible
✓ **Error Messages**: Clear, descriptive error text
✓ **Loading States**: Visual indicators for loading

---

## Common Patterns

### Loading State
```jsx
{isLoading ? (
  <div className="text-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
    <p className="text-gray-600 mt-4">Loading...</p>
  </div>
) : (
  // Content
)}
```

### Empty State
```jsx
<div className="text-center py-12">
  <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
  <p className="text-gray-500 font-medium">No items found</p>
  <p className="text-gray-400 text-sm">Description of empty state</p>
</div>
```

### Alert Message
```jsx
<div className="p-4 rounded-lg flex items-start gap-3 bg-emerald-50 border border-emerald-200">
  <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
  <p className="text-emerald-700">Success message here</p>
</div>
```

---

## Implementation Notes

1. **Always use Tailwind classes** - No inline styles
2. **Use custom component classes** - `.btn-primary`, `.card`, etc.
3. **Responsive first** - Mobile defaults, then `md:`, `lg:` prefixes
4. **Icons from lucide-react** - Consistent sizing and styling
5. **No manual shadows** - Use Tailwind shadow utilities
6. **Consistent spacing** - Use Tailwind space utilities
7. **Global font** - Inter applied to all text

---

## Production Checklist

- [x] Build passes without errors
- [x] Linting compliant
- [x] Responsive on all breakpoints
- [x] Accessibility standards met
- [x] Error states handled
- [x] Loading states shown
- [x] Empty states displayed
- [x] Color contrast verified
- [x] Icons properly sized
- [x] Forms validated

---

**Last Updated**: February 15, 2026
**Version**: 1.0
**Status**: Production Ready ✅
