import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import { Divider, Typography } from "antd";
import { useUpdateReadCountMutation } from "../../../redux/features/question/questionApi";
const { Title, Paragraph, Text } = Typography;

const ViewQuestion = () => {
  const [updateReadCount] = useUpdateReadCountMutation();
  const { dashboard } = useAppSelector((state) => state);

  useEffect(() => {
    updateReadCount(dashboard?.editValue?.id);
  }, [dashboard, updateReadCount]);

  return (
    <div className="border rounded-md p-2">
      <blockquote>
        <Title level={5}>{dashboard?.editValue?.name}</Title>
        <Text className="font-brand__font__medium">
          {dashboard?.editValue?.emailOrPhone}
        </Text>
      </blockquote>
      <Divider />
      <Paragraph className="text-brand__font__size__base">
        {dashboard?.editValue?.questionText}
      </Paragraph>
    </div>
  );
};

export default ViewQuestion;
