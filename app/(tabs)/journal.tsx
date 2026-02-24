import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/constants/Colors';
import { Button } from '@/components/Button';
import { useAuth } from '@/context/AuthContext';
import { useStreak } from '@/context/StreakContext';
import { getJournalEntries, createJournalEntry, deleteJournalEntry } from '@/services/journal';
import { getRandomPrompt } from '@/constants/Prompts';
import type { JournalEntry, JournalPrompt } from '@/types';

export default function JournalScreen() {
  const { user } = useAuth();
  const { streak } = useStreak();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState<JournalPrompt>(getRandomPrompt());
  const [content, setContent] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) loadEntries();
  }, [user]);

  const loadEntries = async () => {
    if (!user) return;
    setLoading(true);
    const data = await getJournalEntries(user.id);
    setEntries(data);
    setLoading(false);
  };

  const handleNewEntry = () => {
    setCurrentPrompt(getRandomPrompt());
    setContent('');
    setShowEditor(true);
  };

  const handleSave = async () => {
    if (!user || !content.trim()) return;
    setSaving(true);
    const entry = await createJournalEntry(
      user.id,
      currentPrompt.text,
      content.trim(),
      streak?.currentStreak ?? 0
    );
    if (entry) {
      setEntries(prev => [entry, ...prev]);
      setShowEditor(false);
      setContent('');
    } else {
      Alert.alert('Error', 'Could not save your entry. Please try again.');
    }
    setSaving(false);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete entry', 'Are you sure you want to delete this journal entry?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          await deleteJournalEntry(id);
          setEntries(prev => prev.filter(e => e.id !== id));
        },
      },
    ]);
  };

  const renderEntry = ({ item }: { item: JournalEntry }) => (
    <View style={styles.entryCard}>
      <View style={styles.entryHeader}>
        <Text style={styles.entryDay}>Day {item.streakDay}</Text>
        <Text style={styles.entryDate}>{formatDate(item.createdAt)}</Text>
        <TouchableOpacity onPress={() => handleDelete(item.id)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.deleteBtn}>×</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.entryPrompt}>{item.prompt}</Text>
      <Text style={styles.entryContent} numberOfLines={4}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Journal</Text>
        <TouchableOpacity style={styles.addBtn} onPress={handleNewEntry} activeOpacity={0.7}>
          <Text style={styles.addBtnText}>+ New entry</Text>
        </TouchableOpacity>
      </View>

      {entries.length === 0 && !loading ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyIcon}>📖</Text>
          <Text style={styles.emptyTitle}>Your journal awaits</Text>
          <Text style={styles.emptyBody}>
            Writing helps you process, reflect, and grow. Your entries are private and secure.
          </Text>
          <Text style={styles.emptyScripture}>
            "Let us examine our ways and test them, and let us return to the Lord."
          </Text>
          <Text style={styles.emptyRef}>— Lamentations 3:40</Text>
          <Button
            title="Write your first entry"
            onPress={handleNewEntry}
            style={styles.emptyBtn}
          />
        </View>
      ) : (
        <FlatList
          data={entries}
          keyExtractor={item => item.id}
          renderItem={renderEntry}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Editor Modal */}
      <Modal
        visible={showEditor}
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowEditor(false)}
      >
        <SafeAreaView style={styles.editorContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.editorKeyboard}
          >
            <View style={styles.editorHeader}>
              <TouchableOpacity onPress={() => setShowEditor(false)} activeOpacity={0.7}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.editorTitle}>New Entry</Text>
              <TouchableOpacity onPress={() => setCurrentPrompt(getRandomPrompt())} activeOpacity={0.7}>
                <Text style={styles.shuffleText}>↻ Prompt</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.editorBody} showsVerticalScrollIndicator={false}>
              <View style={styles.promptBox}>
                <Text style={styles.promptLabel}>Reflection prompt</Text>
                <Text style={styles.promptText}>{currentPrompt.text}</Text>
              </View>

              <TextInput
                style={styles.textInput}
                value={content}
                onChangeText={setContent}
                placeholder="Write freely here. This is your safe space..."
                placeholderTextColor={Colors.textTertiary}
                multiline
                autoFocus
                textAlignVertical="top"
              />
            </ScrollView>

            <View style={styles.editorFooter}>
              <Text style={styles.charCount}>{content.length} characters</Text>
              <Button
                title="Save entry"
                onPress={handleSave}
                loading={saving}
                disabled={content.trim().length === 0}
                style={styles.saveBtn}
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  title: { ...Typography.h2, color: Colors.text },
  addBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  addBtnText: { ...Typography.caption, color: Colors.white, fontWeight: '600' },
  listContent: { paddingHorizontal: Spacing.lg, paddingBottom: Spacing.xxl },
  entryCard: {
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    shadowColor: Colors.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  entryHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: Spacing.sm, gap: Spacing.sm },
  entryDay: {
    ...Typography.caption,
    color: Colors.white,
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    fontWeight: '600',
    overflow: 'hidden',
  },
  entryDate: { ...Typography.caption, color: Colors.textTertiary, flex: 1 },
  deleteBtn: { fontSize: 20, color: Colors.textTertiary, lineHeight: 24 },
  entryPrompt: {
    ...Typography.caption,
    color: Colors.primary,
    fontStyle: 'italic',
    marginBottom: Spacing.sm,
    fontWeight: '500',
  },
  entryContent: { ...Typography.body, color: Colors.textSecondary, lineHeight: 22 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
  },
  emptyIcon: { fontSize: 56, marginBottom: Spacing.sm },
  emptyTitle: { ...Typography.h3, color: Colors.text, textAlign: 'center' },
  emptyBody: { ...Typography.body, color: Colors.textSecondary, textAlign: 'center', lineHeight: 24 },
  emptyScripture: { ...Typography.body, fontStyle: 'italic', color: Colors.text, textAlign: 'center', marginTop: Spacing.md },
  emptyRef: { ...Typography.caption, color: Colors.secondary, fontWeight: '600' },
  emptyBtn: { marginTop: Spacing.md, width: '100%' },
  editorContainer: { flex: 1, backgroundColor: Colors.background },
  editorKeyboard: { flex: 1 },
  editorHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.divider,
  },
  cancelText: { ...Typography.body, color: Colors.textSecondary },
  editorTitle: { ...Typography.body, color: Colors.text, fontWeight: '600' },
  shuffleText: { ...Typography.body, color: Colors.primary, fontWeight: '600' },
  editorBody: { flex: 1, paddingHorizontal: Spacing.lg, paddingTop: Spacing.md },
  promptBox: {
    backgroundColor: Colors.surfaceSecondary,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: Colors.primary,
  },
  promptLabel: { ...Typography.caption, color: Colors.primary, fontWeight: '600', marginBottom: 4 },
  promptText: { ...Typography.body, color: Colors.text, fontStyle: 'italic', lineHeight: 24 },
  textInput: {
    ...Typography.body,
    color: Colors.text,
    lineHeight: 26,
    minHeight: 240,
    paddingTop: 0,
  },
  editorFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.divider,
    gap: Spacing.md,
  },
  charCount: { ...Typography.caption, color: Colors.textTertiary },
  saveBtn: { flex: 1 },
});
