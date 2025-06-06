interface EditableFieldProps {
    label: string;
    value: string;
    isEditing: boolean;
    onChange: (value: string) => void;
  }
  
  export const EditableField = ({
    label,
    value,
    isEditing,
    onChange,
  }: EditableFieldProps) => {
    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">{label}</label>
        {isEditing ? (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 border p-1"
          />
        ) : (
          <input
            type="text"
            value={value}
            readOnly
            className="mt-1 block w-full rounded-md border-gray-300 border p-1 cursor-default"
          />
        )}
      </div>
    );
  };