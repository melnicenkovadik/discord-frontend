import React, { ChangeEvent } from 'react';
import { useAppSelector } from '../../app/hooks/redux';
import { Checkbox } from '@material-tailwind/react';
import { useActions } from '../../app/hooks/actions';

export const Settings = () => {
  const { audioOnly } = useAppSelector(state => state.room);
  const { setAudioOnly } = useActions();
  const [settings, setSettings] = React.useState({
    audioOnly: audioOnly,
  } as any);

  function onCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    setSettings({ ...settings, audioOnly: event.target.checked });
    if (event.target.checked) {
      setAudioOnly(true);
    } else {
      setAudioOnly(false);
    }
  }

  return (
    <>
      <div className="flex flex-col shadow w-[100%]">
        <div className="w-[100%] h-[100%] flex flex-col justify-start  relative  overflow-hidden">
          <div className="p-[40px] flex flex-col w-[100%] justify-start items-start animate__animated animate__fadeInRightBig ">
            <h1>Налаштування</h1>
            <div className="flex flex-col w-[100%] justify-start items-start">
              <Checkbox
                checked={settings.audioOnly}
                label="Тільки аудіо"
                onChange={onCheckboxChange}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
