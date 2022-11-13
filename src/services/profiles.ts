import { Profile } from '@/models/profile';
import { profilesRepository } from '@/repositories/profiles';
import { Items, PaginationOpts } from '@/types';

class ProfilesService {
  async getById(userId: number): Promise<Profile | null> {
    return await profilesRepository.findById(userId);
  }

  async searchByAnthroponym(
    params: { anthroponym: string; excludeUserId?: number } & PaginationOpts,
  ): Promise<Items<Profile>> {
    const profiles = await profilesRepository.findByAnthroponym(params);
    return {
      items: profiles,
      count: profiles.length,
    };
  }
}

const profilesService = new ProfilesService();

export { profilesService };
