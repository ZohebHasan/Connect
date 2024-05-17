import React, { useState } from 'react';
import styled, { css, ThemeProvider } from 'styled-components';
import { useDarkMode } from '../../../../contexts/DarkMode/DarkMode';




const DatePicker: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const {isDarkMode} = useDarkMode();

  const [active, setActive] = useState('');

  return (
    <Picker $isDarkMode = {isDarkMode}>
      <LabelContainer active={active === 'date'} $isDarkMode = {isDarkMode}>
        <Label>Date</Label>
        <Select
            active={active === 'date'} 
            $isDarkMode={isDarkMode}
            defaultValue=""
            onFocus={() => setActive('date')}
            onBlur={() => setActive('')}
        >
          <option value="" disabled>DD</option>
          {days.map(day => (
            <option key={day} value={day}>
              {day.toString().padStart(2, '0')}
            </option>
          ))}
        </Select>
      </LabelContainer>
      <LabelContainer active={active === 'month'} $isDarkMode = {isDarkMode}>
        <Label>Month</Label>
        <Select
            active={active === 'month'} 
            $isDarkMode={isDarkMode}
            defaultValue=""
            onFocus={() => setActive('month')}
            onBlur={() => setActive('')}
        >
          <option value="" disabled>MM</option>
          {months.map(month => (
            <option key={month} value={month}>
              {month.toString().padStart(2, '0')}
            </option>
          ))}
        </Select>
      </LabelContainer>
      <LabelContainer active={active === 'year'} $isDarkMode = {isDarkMode}>
        <Label>Year</Label>
        <Select active={active === 'year'} 
                $isDarkMode={isDarkMode}
                defaultValue=""
                onFocus={() => setActive('year')}
                onBlur={() => setActive('')}
        >
          <option value="" disabled>YYYY</option>
          {years.map(year => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </Select>
      </LabelContainer>
    </Picker>
  );
};

export default DatePicker;



const Picker = styled.div <{$isDarkMode: boolean}>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ $isDarkMode }) => $isDarkMode ? 'rgba(72, 72, 72, 0.4)' : 'rgba(255, 255, 255, 0.4)'};
  color: ${({ $isDarkMode }) => $isDarkMode ? '#fff' : '#000'};
  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.2);
  border: ${({ $isDarkMode }) => $isDarkMode ? '0.8px solid rgb(252, 105, 186)' : '1.5px solid rgb(254, 178, 224)'};
  
`;
interface SelectProps {
    active: boolean;
    $isDarkMode: boolean;
}

const Select = styled.select<SelectProps>`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  font-size: 16px;
  background-color: inherit;
  color: ${({ $isDarkMode }) => $isDarkMode ? '#fff' : '#000'};

  &:focus {
    outline: none;  // This removes the blue outline
  }

//   border: ${({ active, $isDarkMode }) => active ? '1px solid rgba(253, 211, 255, 0.879)' :""};
`;



interface LabelContainerProps {
    active: boolean;
    $isDarkMode: boolean;
  }
  
const LabelContainer = styled.div<LabelContainerProps>`
  display: flex;
  flex-direction: column;
  width: 30%;
  background-color: ${({ active, $isDarkMode }) => active ? ($isDarkMode ? '#555' : '#eee') : 'inherit'};
  color: ${({ active}) => active ?  ' #ED1E79;': ''};
  border:   ${({ active }) => active ?  '1px solid rgba(253, 211, 255, 0.879)': ''};
    
  border-radius: 10px;
  padding: 5px;
`;

const Label = styled.label`
  font-size: 14px;
  margin-bottom: 5px;
`;

