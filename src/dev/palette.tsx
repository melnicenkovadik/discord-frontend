import React from 'react';
import { Category, Component, Variant, Palette } from '@react-buddy/ide-toolbox';

export const PaletteTree = () => {
  return (
    <Palette>
      <Category name="Discord UI">
        <Component name="<Button/>">
          <Variant name="Default purple">
            <button
              type="submit"
              className="bg-purple font-bold  text-white shadow-none flex w-[30%] flex items-center justify-center  whitespace-nowrap"
            >
              Відправити запит
            </button>
          </Variant>
          <Variant name="Transparent Hover">
            <button
              className="flex items-center justify-start w-full min-h-[40px] mb-2
           hover:bg-darkGray rounded-md cursor-pointer px-2   "
            >
              Button
            </button>
          </Variant>
        </Component>
        <Component name="HR">
          <Variant name="Default">
            <hr className="w-[100%] h-[1px] bg-darkGray border-none  shadow my-20" />
          </Variant>
        </Component>
        <Component name="<Text/>">
          <Variant name="White" requiredParams={['text']}>
            <div className="text-white">Text</div>
          </Variant>
          <Variant name="Secondary">
            <div>Text</div>
          </Variant>
        </Component>
      </Category>
    </Palette>
  );
};
