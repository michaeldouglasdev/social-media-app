import {
  FragmentType,
  graphql,
  getFragmentData,
} from "@/graphql/__generated__";
import {
  ReplyPostNotification,
  ReplyPostNotificationItemFragment,
} from "./reply-post-notification.component";

function isReplyPostNotification(
  notification: FragmentType<typeof NotificationItemFragment>
  // @ts-ignore
): notification is FragmentType<typeof ReplyPostNotificationItemFragment> {
  const notificationFragment = getFragmentData(
    NotificationItemFragment,
    notification
  );

  return notificationFragment.__typename === "ReplyPostNotification";
}

export const NotificationItemFragment = graphql(/* GraphQL */ `
  fragment NotificationItem on Notification {
    id
    createdAt
    fromUser {
      id
      name
      username
      ...UserAvatar
    }
    ... on ReplyPostNotification {
      post {
        id
        content
      }
    }
  }
`);

type NotificationProps = {
  notification: FragmentType<typeof NotificationItemFragment>;
};
export const Notification: React.FC<NotificationProps> = (props) => {
  if (isReplyPostNotification(props.notification)) {
    return <ReplyPostNotification notification={props.notification} />;
  }

  return null;
};
