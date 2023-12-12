import { useEffect } from "react";
import { useAppSelector } from "../../../redux/hook";
import { Rate, Typography } from "antd";
import { useUpdateReviewReadCountMutation } from "../../../redux/features/review/reviewApi";
const { Title, Paragraph, Text } = Typography;

const ViewReview = () => {
  const [updateReviewReadCount] = useUpdateReviewReadCountMutation();
  const {
    dashboard: { editValue },
  } = useAppSelector((state) => state);

  useEffect(() => {
    updateReviewReadCount(editValue?.id);
  }, [editValue, updateReviewReadCount]);

  return (
    <div className="border rounded-md p-2">
      <blockquote>
        <Title level={5}>{editValue?.name}</Title>
        <Text keyboard>{editValue?.email}</Text>
        <div className="mt-2">
          <Rate allowHalf disabled defaultValue={editValue?.rate} />
        </div>
      </blockquote>

      <Paragraph>
        <pre>{editValue?.details}</pre>
      </Paragraph>
    </div>
  );
};

export default ViewReview;
