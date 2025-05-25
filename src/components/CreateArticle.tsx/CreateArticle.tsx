import type { ReactElement } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import MDEditor from '@uiw/react-md-editor';

import styles from './CreateArticle.module.scss';

const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image: z.instanceof(FileList).optional(),
  content: z.string().min(1, 'Content is required'),
});

type ArticleFormData = z.infer<typeof articleSchema>;

const CreateArticle = (): ReactElement => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      content: 'Supports markdown. Yay!',
    },
  });

  const onSubmit = (data: ArticleFormData): void => {
    console.log('Form Data:', data);
  };

  return (
    <form
      className={styles.createArticleForm}
      onSubmit={handleSubmit(onSubmit)}
      data-color-mode="light"
    >
      <div className={styles.formHeader}>
        <h1>Create new article</h1>
        <button type="submit" className={styles.publishBtn}>
          Publish Article
        </button>
      </div>

      <label htmlFor="title">Article Title</label>
      <input
        id="title"
        {...register('title')}
        placeholder="My First Article"
        className={styles.input}
      />
      {errors.title && (
        <span className={styles.error}>{errors.title.message}</span>
      )}

      <label htmlFor="image">Featured image</label>
      <input type="file" id="image" {...register('image')} />

      <label htmlFor="content">Content</label>
      <Controller
        name="content"
        control={control}
        render={({ field }) => (
          <div className={styles.mdInputWrapper}>
            <MDEditor
              {...field}
              preview="edit"
              height={300}
              hideToolbar={true}
              textareaProps={{
                placeholder: 'Supports markdown. Yay!',
                className: styles.input,
              }}
            />
          </div>
        )}
      />
      {errors.content && (
        <span className={styles.error}>{errors.content.message}</span>
      )}
    </form>
  );
};

export default CreateArticle;
