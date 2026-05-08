import matplotlib.pyplot as plt
import numpy as np

# ==========================================
# 1. DATA CONFIGURATION
# ==========================================
semesters = ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4']
sgpa_data = [8.15, 8.15, 8.61, 8.70]

# Auto-calculate CGPA
cgpa_data = []
running_sum = 0
for i, sgpa in enumerate(sgpa_data):
    running_sum += sgpa
    cgpa_data.append(round(running_sum / (i + 1), 2))

# ==========================================
# 2. PLOT SETUP (Dark Mode Engineering Theme)
# ==========================================
bg_color = '#0f172a'   # Dark Slate
text_color = '#f1f5f9' # Off-white
accent_cyan = '#38bdf8' # Cyan (CGPA)
accent_grey = '#94a3b8' # Grey (SGPA)
highlight = '#facc15'   # Yellow (Achievements)
drdo_color = '#ef4444'  # Red (Govt/Defense)
cmti_color = '#10b981'  # Green (CMTI/Mfg)

fig, ax = plt.subplots(figsize=(16, 9), facecolor=bg_color)
ax.set_facecolor(bg_color)

# ==========================================
# 3. PLOTTING DATA
# ==========================================
# Plot SGPA
ax.plot(semesters, sgpa_data, color=accent_grey, marker='o', linestyle='--', 
        linewidth=2, label='Semester GPA (SGPA)', alpha=0.6)

# Plot CGPA
ax.plot(semesters, cgpa_data, color=accent_cyan, marker='o', 
        linewidth=4, label='Cumulative GPA (CGPA)')

# Fill area
ax.fill_between(semesters, cgpa_data, color=accent_cyan, alpha=0.1)

# ==========================================
# 4. MILESTONES (The Stacked Layout)
# ==========================================

# --- SEMESTER 2: Engineering Intern ---
ax.annotate('Engineering Intern\n(Startup/Industry)', 
            xy=(1, sgpa_data[1]), xytext=(1, sgpa_data[1] - 0.5), # Below
            arrowprops=dict(facecolor=accent_grey, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=accent_grey, ec="none"))

# --- SEMESTER 3: DOUBLE INTERNSHIP (Samsung + CMTI) ---
# 1. Samsung (Above the line)
ax.annotate('Samsung PRISM Intern\n(Computer Vision)', 
            xy=(2, cgpa_data[2]), xytext=(2, cgpa_data[2] + 0.5), # Push Up
            arrowprops=dict(facecolor=highlight, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=highlight, ec="none"))

# 2. CMTI (Below the line)
ax.annotate('CMTI ML Intern\n(Govt. of India)', 
            xy=(2, sgpa_data[2]), xytext=(2, sgpa_data[2] - 0.5), # Push Down
            arrowprops=dict(facecolor=cmti_color, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=cmti_color, ec="none"))

# --- SEMESTER 4: THE TRIFECTA (DRDO + SIH + Kitsune) ---
# 1. DRDO (Highest Priority - Red)
ax.annotate('DRDO Research Intern\n(Defense R&D)', 
            xy=(3, sgpa_data[3]), xytext=(3, sgpa_data[3] + 0.6), # High Above
            arrowprops=dict(facecolor=drdo_color, shrink=0.05, width=2, headwidth=8),
            fontsize=11, color='white', fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=drdo_color, ec="none"))

# 2. Kitsune (Right Side Offset)
ax.annotate('Published torch-kitsune v0.3.0\n(CUDA Optimization)', 
            xy=(3, cgpa_data[3]), xytext=(3.4, cgpa_data[3]), # Shift Right
            arrowprops=dict(facecolor=accent_cyan, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='left',
            bbox=dict(boxstyle="round,pad=0.4", fc=accent_cyan, ec="none"))

# 3. SIH (Bottom Anchor)
ax.annotate('SIH Finalist:\nMarine Intel System', 
            xy=(3, sgpa_data[3]), xytext=(3, sgpa_data[3] - 0.7), # Low Below
            arrowprops=dict(facecolor=highlight, shrink=0.05, width=2, headwidth=8),
            fontsize=10, color=bg_color, fontweight='bold', ha='center',
            bbox=dict(boxstyle="round,pad=0.4", fc=highlight, ec="none"))

# ==========================================
# 5. STYLING
# ==========================================
plt.title("Academic & Research Trajectory | Jeeth Bhavesh Kataria", 
          fontsize=22, color=text_color, fontweight='bold', pad=20)
plt.suptitle("M.S. Ramaiah Institute of Technology | AI & Data Science", 
             fontsize=14, color=accent_grey, y=0.93)

ax.spines['bottom'].set_color(text_color)
ax.spines['left'].set_color(text_color)
ax.spines['top'].set_visible(False)
ax.spines['right'].set_visible(False)
ax.tick_params(axis='x', colors=text_color, labelsize=12)
ax.tick_params(axis='y', colors=text_color, labelsize=12)

# Y-Axis Range
ax.set_ylim(7.4, 10.0) 

# Legend
legend = ax.legend(loc='upper left', facecolor=bg_color, edgecolor=text_color)
for text in legend.get_texts():
    text.set_color(text_color)

# Footer
plt.figtext(0.5, 0.02, "Timeline includes: DRDO & CMTI (Govt) | Samsung PRISM | torch-kitsune (PyPI) | SIH Finalist", 
            ha="center", fontsize=10, color=accent_grey, style='italic')

# Save
plt.tight_layout()
plt.savefig('Jeeth_Kataria_Academic_Trajectory_Final.png', dpi=300, bbox_inches='tight')
print("Graph generated: Jeeth_Kataria_Academic_Trajectory_Final.png")