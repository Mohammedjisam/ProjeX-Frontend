import { Notification } from "../../../types/developer/dashboard";

interface NotificationsPanelProps {
  notifications: Notification[];
}

export const NotificationsPanel = ({ notifications }: NotificationsPanelProps) => (
  <ul className="space-y-4">
    {notifications.map((notification) => (
      <li key={notification.id} className="border-b border-sidebar-border/30 pb-3">
        <p className="text-sm">
          <span className="w-2 h-2 inline-block bg-primary rounded-full mr-2"></span>
          {notification.text}
        </p>
      </li>
    ))}
  </ul>
);