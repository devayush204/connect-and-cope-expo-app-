import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Switch, Alert } from 'react-native';
import { ChevronRight, Bell, Shield, HelpCircle, Info, Moon, Trash2 } from 'lucide-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '@/constants/Colors';

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  
  const toggleNotifications = () => {
    setNotificationsEnabled(previousState => !previousState);
  };
  
  const clearAllData = async () => {
    Alert.alert(
      "Clear All Data",
      "Are you sure you want to clear all your chat history and settings? This action cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "Clear All", 
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              Alert.alert("Success", "All data has been cleared successfully.");
            } catch (error) {
              Alert.alert("Error", "Failed to clear data. Please try again.");
            }
          }
        }
      ]
    );
  };

  const renderSettingItem = (icon, title, subtitle, action, rightElement = null) => (
    <TouchableOpacity style={styles.settingItem} onPress={action}>
      <View style={styles.settingIconContainer}>
        {icon}
      </View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      {rightElement || <ChevronRight size={20} color={Colors.textSecondary} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        {renderSettingItem(
          <Bell size={22} color={Colors.primary} />,
          "Notifications",
          "Receive chat reminders and updates",
          toggleNotifications,
          <Switch
            value={notificationsEnabled}
            onValueChange={toggleNotifications}
            trackColor={{ false: "#D1D5DB", true: `${Colors.primary}80` }}
            thumbColor={notificationsEnabled ? Colors.primary : "#F3F4F6"}
          />
        )}
        
        {renderSettingItem(
          <Shield size={22} color={Colors.primary} />,
          "Privacy",
          "Manage your data and privacy settings",
          () => Alert.alert("Privacy", "Privacy settings will be available in a future update.")
        )}
        
        {renderSettingItem(
          <Moon size={22} color={Colors.primary} />,
          "Appearance",
          "Change theme and visual preferences",
          () => Alert.alert("Appearance", "Theme settings will be available in a future update.")
        )}
        
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Support</Text>
        
        {renderSettingItem(
          <HelpCircle size={22} color={Colors.primary} />,
          "Help & Support",
          "Get assistance and answers to common questions",
          () => Alert.alert("Help", "Help center will be available in a future update.")
        )}
        
        {renderSettingItem(
          <Info size={22} color={Colors.primary} />,
          "About",
          "Learn more about Connect & Cope",
          () => Alert.alert("About", "Connect & Cope v1.0.0\nYour AI Companion for Every Feeling")
        )}
        
        <Text style={[styles.sectionTitle, { marginTop: 24 }]}>Data</Text>
        
        {renderSettingItem(
          <Trash2 size={22} color={Colors.error} />,
          "Clear All Data",
          "Delete all your conversations and settings",
          clearAllData
        )}
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
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
  settingIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  settingSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  versionText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 24,
  },
});