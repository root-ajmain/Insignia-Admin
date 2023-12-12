const useToaster = (api) => {
  const openNotificationWithIcon = (type, title, message) => {
    api[type]({
      message: title,
      description: message,
    });
  };
  return openNotificationWithIcon;
};

export default useToaster;
