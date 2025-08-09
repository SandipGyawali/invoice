function DefaultInfoAlert() {
  return (
    <>
      <p className="mb-1 mt-2">Here’s how to use this section effectively:</p>
      <ul className="list-inside list-disc text-sm space-y-1">
        <li>
          Use the <b>“Add”</b> button to create a new record.
        </li>
        <li>
          Click on an existing record <b>Actions</b> column to view or edit its
          details.
        </li>
        <li>
          Some actions may be hidden if you don’t have the required permissions.
        </li>
        <li>
          Make sure all necessary information is complete before saving changes.
        </li>
      </ul>
    </>
  );
}

export { DefaultInfoAlert };
