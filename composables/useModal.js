export const useModal = () => {
  const { $bootstrap } = useNuxtApp();

  const open = async (id) => {
    await nextTick();
    const el = document.getElementById(id);
    if (!el) return;
    new $bootstrap.Modal(el).show();
  };

  const close = (id) => {
    const el = document.getElementById(id);
    const modal = $bootstrap.Modal.getInstance(el);
    modal?.hide();
  };

  return { open, close };
};