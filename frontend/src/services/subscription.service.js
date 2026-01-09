import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8081/api/membership/';

class SubscriptionService {
    async getMySubscription() {
        try {
            const response = await axios.get(API_URL + 'my-subscription', { headers: authHeader() });
            return response.data;
        } catch (error) {
            console.error('Error fetching subscription:', error);
            return null;
        }
    }

    async hasFeatureAccess(feature) {
        const subscription = await this.getMySubscription();

        console.log('🔍 Checking feature access for:', feature);
        console.log('📦 Subscription data:', subscription);

        if (!subscription || !subscription.plan || !subscription.plan.features) {
            console.log('❌ No subscription or plan features found');
            return false;
        }

        const hasAccess = subscription.plan.features.includes(feature);
        console.log(`✅ Has access to ${feature}:`, hasAccess);
        console.log('📋 Available features:', subscription.plan.features);
        return hasAccess;
    }

    async getPlanTier() {
        const subscription = await this.getMySubscription();

        if (!subscription || !subscription.plan) {
            return 'FREE';
        }

        return subscription.plan.name.toUpperCase();
    }

    async getSubscriptionStatus() {
        const subscription = await this.getMySubscription();

        if (!subscription) {
            return {
                isActive: false,
                planName: 'Free',
                expiryDate: null
            };
        }

        return {
            isActive: subscription.subscription.status === 'ACTIVE',
            planName: subscription.plan.name,
            expiryDate: subscription.subscription.endDate,
            features: subscription.plan.features || []
        };
    }
}

export default new SubscriptionService();
