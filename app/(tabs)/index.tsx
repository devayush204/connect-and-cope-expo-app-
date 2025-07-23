import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowRight } from 'lucide-react-native';
import WavyHeader from '@/components/WavyHeader';
import Colors from '@/constants/Colors';

export default function HomeScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <WavyHeader height={200}>
        <Text style={styles.headerTitle}>Connect & Cope</Text>
        <Text style={styles.headerSubtitle}>Your AI Companion for Every Feeling</Text>
      </WavyHeader>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroSection}>
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?q=80&w=1000&auto=format&fit=crop' }} 
            style={styles.heroImage}
            resizeMode="cover"
          />
          
          <View style={styles.welcomeCard}>
            <Text style={styles.welcomeTitle}>Welcome to Connect & Cope</Text>
            <Text style={styles.welcomeText}>
              In a world that can often feel isolating, we offer a unique and empathetic space 
              for you to share your feelings openly and without judgment.
            </Text>
            
            <TouchableOpacity 
              style={styles.exploreButton}
              onPress={() => router.push('/companions')}
            >
              <Text style={styles.exploreButtonText}>Explore Companions</Text>
              <ArrowRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>How It Works</Text>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureNumber}>1</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Share Your Feelings</Text>
                <Text style={styles.featureText}>
                  Express yourself openly in a safe, judgment-free environment.
                </Text>
              </View>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureNumber}>2</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Choose Your Companion</Text>
                <Text style={styles.featureText}>
                  Select from various AI personas designed for different emotional contexts.
                </Text>
              </View>
            </View>
            
            <View style={styles.featureCard}>
              <Text style={styles.featureNumber}>3</Text>
              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>Connect & Feel Understood</Text>
                <Text style={styles.featureText}>
                  Engage in meaningful conversations tailored to your emotional needs.
                </Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.startButton}
            onPress={() => router.push('/companions')}
          >
            <Text style={styles.startButtonText}>Start Chatting Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
    marginTop: 160,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700' as const,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    textAlign: 'center',
    marginTop: 8,
  },
  heroSection: {
    padding: 20,
  },
  heroImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 24,
  },
  welcomeCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  welcomeTitle: {
    fontSize: 22,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 16,
    color: Colors.textSecondary,
    lineHeight: 24,
    marginBottom: 20,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  exploreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600' as const,
    marginRight: 8,
  },
  featuresSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: Colors.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  featureNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.primary,
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 18,
    fontWeight: '700' as const,
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  featureText: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700' as const,
  },
});