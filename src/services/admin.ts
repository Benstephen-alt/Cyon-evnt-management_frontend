import api from "@/lib/api";

export const settingsService = {
  async getAdmins() {
    const { data } = await api.get("/admin/get-admins");
    return data;
  },

  async createAdmin(data: any) {
    const response = await api.post("/admin/admins-create", data);
    return response.data;
  },

  async updateAdmin(id: string, data: any) {
    const response = await api.patch(`/admin/admins/${id}`, data);
    return response.data;
  },

  async disableAdmin(id: string) {
    const response = await api.patch(`/admin/admins/${id}/disable`);
    return response.data;
  },

  async enableAdmin(id: string) {
    const response = await api.patch(`/admin/admins/${id}/enable`);
    return response.data;
  },

  async resetPassword(id: string) {
    const response = await api.patch(
      `/admin/admins/${id}/reset-password`
    );
    return response.data;
  },

  async getParishes() {
    const response = await api.get("/admin/parishes");
    return response.data;
  },

  async regenerateAccessCode(id: string) {
    const response = await api.patch(
      `/admin/parishes/${id}/regenerate-access-code`
    );
    return response.data;
  },
};