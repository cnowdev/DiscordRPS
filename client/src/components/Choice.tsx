interface ChoiceProps {
    emoji: string;
    label: string;
    selectedChoice: string | null;
    setSelectedChoice: React.Dispatch<React.SetStateAction<string | null>>
  }

export const Choice: React.FC<ChoiceProps> = ({ emoji, label, selectedChoice, setSelectedChoice }) => {
    return (
      <div className={`flex flex-col items-center p-4 transition-transform transform border-2 rounded-lg cursor-pointer ${selectedChoice == label? 'scale-110 border-blue-700': 'border-gray-300  hover:scale-105'}`} onClick={() => setSelectedChoice(label)}>
        <span role="img" aria-label={label} className="text-8xl">
          {emoji}
        </span>
        <span className="mt-2 text-lg">{label}</span>
      </div>
    );
  };