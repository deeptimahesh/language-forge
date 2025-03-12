// Core purpose: Define MongoDB schema structure for Project
// This is used to create a MongoDB collection for Projects
// It also defines the schema for the Project type

import mongoose, { Schema, model, models } from 'mongoose';
import { Project } from '@/types/project';

// Language Profile Recommendation Schemas
const PhonologyRecommendationSchema = new Schema({
  consonantComplexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  vowelComplexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  tonality: { type: Boolean, default: false },
  stressImportance: { 
    type: String, 
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  suggestedSounds: [String],
  avoidedSounds: [String],
  notes: String
}, { _id: false });

const GrammarRecommendationSchema = new Schema({
  morphologyComplexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  syntaxComplexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  suggestedFeatures: [String],
  avoidedFeatures: [String],
  notes: String
}, { _id: false });

const LexiconRecommendationSchema = new Schema({
  rootComplexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  derivationComplexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  primaryVocabularyDomains: [String],
  etymologyRecommendations: [String],
  notes: String
}, { _id: false });

// Language Profile Schema
const LanguageProfileSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  shortDescription: { type: String, default: '' },
  
  // Conceptual framework
  speciesDescription: { type: String, default: '' },
  anatomicalConstraints: [String],
  
  // Cultural framework
  culturalInspiration: [String],
  environmentalContext: { type: String, default: '' },
  socialStructure: { type: String, default: '' },
  
  // Aesthetic goals
  aestheticQualities: [String],
  examples: [String],
  
  // Technical specifications
  complexity: { 
    type: String, 
    enum: ['simple', 'moderate', 'complex'],
    default: 'moderate'
  },
  purposeAndContext: { type: String, default: '' },
  
  // AI-generated recommendations
  recommendedFeatures: {
    phonology: { type: PhonologyRecommendationSchema, default: {} },
    grammar: { type: GrammarRecommendationSchema, default: {} },
    lexicon: { type: LexiconRecommendationSchema, default: {} }
  }
}, { _id: false });

// Project Version Schema
const ProjectVersionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  snapshot: { type: Schema.Types.Mixed }
}, { _id: false });

// Project Schema matching the Project interface in types/project.ts
const ProjectSchema = new Schema<Project>({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  isPublic: { type: Boolean, default: false },
  languageProfile: { type: LanguageProfileSchema, default: {} },
  modules: {
    phonology: { type: Schema.Types.ObjectId, ref: 'PhonologyModule' },
    lexicon: { type: Schema.Types.ObjectId, ref: 'LexiconModule' },
    morphology: { type: Schema.Types.ObjectId, ref: 'MorphologyModule' },
    syntax: { type: Schema.Types.ObjectId, ref: 'SyntaxModule' },
    culture: { type: Schema.Types.ObjectId, ref: 'CultureModule' },
    orthography: { type: Schema.Types.ObjectId, ref: 'OrthographyModule' }
  },
  versions: [ProjectVersionSchema],
  collaborators: [String]
});

// Pre-save hook to update the updatedAt field
ProjectSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Use existing model or create a new one; export the model, handling Next.js hot reload
export default models.Project || model<Project>('Project', ProjectSchema); 