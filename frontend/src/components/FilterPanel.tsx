import _ from 'lodash';

export function FilterPanelWrapper({ children }) {
  return (
    <div
      className="sidebar-height h-full pr-4 overflow-y-auto"
      style={{
        minWidth: 320,
      }}>
      {children}
    </div>
  );
}