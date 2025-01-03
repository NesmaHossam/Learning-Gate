import RenderSteps from "./RenderSteps";

export default function AddCourse() {
  return (
    <>
      <div style={{ display: 'flex', width: '100%', alignItems: 'flex-start', gap: '1.5rem' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <h1 style={{ marginBottom: '3.5rem', fontSize: '1.875rem', fontWeight: '500', color: '#080474' }}>
            Add a New Course
          </h1>
          <div style={{ flex: 1 }}>
            <RenderSteps />
          </div>
        </div>
        {/* Course Upload Tips */}
        <div style={{ position: 'sticky', top: '1.25rem', maxWidth: '400px', flex: 1, borderRadius: '0.375rem', border: '1px solid #ccc', background: '#fff', padding: '1.5rem', display: 'block' }}>
          <ul style={{ marginLeft: '0.625rem', listStyleType: 'disc', marginTop: '1rem', fontSize: '0.875rem', color: '#333', lineHeight: '1.5' }}>
            <li>Specify the pricing or set it as free for your course.</li>
            <li>Recommended thumbnail size is 1024x576 pixels.</li>
            <li>The course overview video should be managed in the Video section.</li>
            <li>Use the Course Builder to create and organize your course content.</li>
            <li>Add topics in the Course Builder to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section will appear on the course's single page.</li>
            <li>Utilize Announcements to notify enrolled students about important updates.</li>
            <li>Send Notes to all enrolled students at once.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
