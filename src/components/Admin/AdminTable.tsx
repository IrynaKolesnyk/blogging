import type { FC } from 'react';
import editIcon from '../../assets/edit.png';
import trashIcon from '../../assets/trash.png';
import type { ArticleResponse } from '../../shared/types';

import styles from './AdminTable.module.scss';

type Props = ArticleResponse;

interface MyArticlesTableProps {
  article: Props;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  userName: string;
}

const AdminTable: FC<MyArticlesTableProps> = ({
  userName,
  article,
  onEdit,
  onDelete,
}) => {
  const { articleId, comments, title, content } = article;
  return (
    <tr className={styles.row} key={articleId}>
      <td>
        <input type="checkbox" />
      </td>
      <td className={styles.truncate}>{title}</td>
      <td className={styles.truncate}>
        <div
          dangerouslySetInnerHTML={{
            __html: content?.slice(0, 25) + '…' || 'No description available.',
          }}
        />
      </td>
      <td>{userName}</td>
      <td>{comments?.length ?? 0}</td>
      <td className={styles.actions}>
        <button onClick={() => onEdit(articleId)} className={styles.iconButton}>
          <img src={editIcon} alt="edit" />
        </button>
        <button
          onClick={() => onDelete(articleId)}
          className={styles.deleteButton}
        >
          <img src={trashIcon} alt="delete" />
        </button>
      </td>
    </tr>
  );
};

export default AdminTable;
